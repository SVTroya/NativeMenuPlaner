import React, {useEffect, useState} from 'react'
import {Text, ScrollView, TouchableOpacity, Image, View, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import {useGlobalContext} from '../../context/GlobalProvider'
import CustomButton from '../../components/CustomButton'
import EditableList from '../../components/EditableList'
import icons from '../../constants/icons'
import * as ImagePicker from 'expo-image-picker'
import {router} from 'expo-router'
import {addRecipe, changeRecipe} from '../../lib/arrwrite'
import colors from '../../constants/colors'
import BackButton from '../../components/BackButton'

function NewEdit({recipe}) {
  const {user} = useGlobalContext()
  const initialFormData = {
    title: '', description: '', ingredients: [], steps: [], image: null
  }
  const [form, setForm] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [imageToDeleteURL, setImageToDeleteURL] = useState(null)
  const [wasChanged, setWasChanged] = useState(false)

  useEffect(() => {
    setWasChanged(isFormChanged())
  }, [form])

  useEffect(() => {
    if (recipe && recipe.title) {
      setForm({
        $id: recipe.$id,
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        image: recipe.image
      })
      setIsEdit(true)
    }
  }, [recipe])

  async function save() {
    if (!form.title.trim()) return Alert.alert('Title is mandatory', 'Please fill in Title field')

    setIsSubmitting(true)

    try {
      isEdit ? await changeRecipe({...form, user: user.$id}, imageToDeleteURL) : await addRecipe({...form, user: user.$id})
      Alert.alert('Recipe saved')
      router.push('/recipeList')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      /*      setForm(initialFormData)*/
      setIsSubmitting(false)
    }
  }

  function handleChangeListValue(newListObject) {
    setForm((prev) => {
      return {...prev, ...newListObject}
    })
  }

  async function openImagePicker() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3
    })

    if (!result.canceled) {
      if (typeof form.image === 'string') setImageToDeleteURL(form.image)
      setForm((prev) => {
        return {...prev, image: result.assets[0]}
      })
    }
  }

  function isFormChanged() {
    const initialValue = recipe ?? initialFormData
    return form.title !== initialValue.title ||
      form.description !== initialValue.description ||
      JSON.stringify(form.ingredients) !== JSON.stringify(initialValue.ingredients) ||
      JSON.stringify(form.steps) !== JSON.stringify(initialValue.steps) ||
      form.image !== initialValue.image
  }

  return (<SafeAreaView className='h-full w-full bg-primary'>
      <ScrollView className='p-4'>
        <View
          className='flex-row h-10 justify-between'>
          <BackButton color={colors.secondary}/>
        </View>
        <Text className='text-gray-800 font-semibold text-2xl'>Add New Recipe</Text>
        <FormField
          title='Title'
          value={form.title}
          placeholder='Title'
          handleChangeValue={(title) => {
            setForm((prev) => {
              return {...prev, title}
            })
          }}
          otherStyles='mt-4'
        />

        <FormField
          title='Description'
          value={form.description}
          placeholder='Description'
          handleChangeValue={(description) => {
            setForm((prev) => {
              return {...prev, description}
            })
          }}
          otherStyles='mt-4'
          fieldStyles='h-36'
          multiline={true}
        />

        <EditableList
          name='Ingredient'
          data={form.ingredients}
          handleAdd={(ingredient) => setForm((prev) => {
            return {...prev, ingredients: [...prev.ingredients, ingredient]}
          })}
          handleChange={(newListObject) => handleChangeListValue(newListObject)}
        />

        <EditableList
          name='Instruction'
          data={form.steps}
          type='numeric'
          handleAdd={(instruction) => setForm((prev) => {
            return {...prev, steps: [...prev.steps, instruction]}
          })}
          handleChange={(newListObject) => handleChangeListValue(newListObject)}
        />

        {form.image
          ?
          (<>
            <Text className='text-base flex-shrink font-semibold mt-6'>Image</Text>
            <TouchableOpacity
              className='bg-gray-200 rounded-xl border-2 border-gray-400 overflow-hidden'
              activeOpacity={0.7}
              onPress={() => openImagePicker()}
            >
              <Image source={{uri: typeof form.image === 'string' ? form.image : form.image.uri}}
                     className='w-full h-56' resizeMode='cover'/>
            </TouchableOpacity>
          </>)
          :
          (<>
            <Text className='text-base flex-shrink font-semibold mt-6'>Upload Image</Text>
            <TouchableOpacity
              className='w-full bg-gray-200 flex justify-center items-center p-2 rounded-xl border-2 border-gray-400'
              activeOpacity={0.7}
              onPress={() => openImagePicker()}
            >
              <View className='w-16 h-16 border border-dashed border-gray-800 flex justify-center items-center'>
                <Image source={icons.upload} className='w-10 h-10' resizeMode='contain'/>
              </View>
            </TouchableOpacity>
          </>)}

        <CustomButton
          title='Save'
          handlePress={save}
          containerStyles='my-7 min-h-16'
          isLoading={isSubmitting}
          isDisabled={!wasChanged}
        />
      </ScrollView>
    </SafeAreaView>)
}

export default NewEdit