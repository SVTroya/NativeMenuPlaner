import colors from '../../../constants/colors'
import {router, Tabs, useLocalSearchParams} from 'expo-router'
import icons from '../../../constants/icons'
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native'
import TabIcon from '../../../components/TabIcon'
import {SafeAreaView} from 'react-native-safe-area-context'
import useAppwrite from '../../../lib/useAppwrite'
import {getBaseRecipeInfo, removeRecipeById} from '../../../lib/arrwrite'
import React, {useState} from 'react'
import DialogModal from '../../../components/DialogModal'
import BackButton from '../../../components/BackButton'
import {defaultImageURL} from '../../../constants/url'

function RecipeTabLayout() {
  const {id} = useLocalSearchParams()
  const {data: recipe} = useAppwrite(() => getBaseRecipeInfo(id))

  const [modalVisible, setModalVisible] = useState(false)

  function handleRemove() {
    setModalVisible(true)
  }

  function handleEdit() {
    router.push(`/recipes/edit/${id}`)
  }

  async function removeRecipe() {
    try {
      await removeRecipeById(id)
      setModalVisible(false)
      router.push('/recipeList')
      Alert.alert('Recipe deleted')
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  return (
    <>
      <View className='h-full bg-secondary'>
        <SafeAreaView className='px-4'>
          <View
            className='flex-row h-10 justify-between'>
            <BackButton color={colors.primary} />

            <View
              className='flex-row'>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleEdit()}
                className='p-2'>
                <Image
                  className='w-6 h-6'
                  source={icons.edit}
                  tintColor={colors.primary}
                  resizeMethod='contain'
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleRemove()}
                className='py-2 pl-2'>
                <Image
                  className='w-6 h-6'
                  source={icons.remove}
                  tintColor={colors.remove}
                  resizeMethod='contain'
                />
              </TouchableOpacity>
            </View>

          </View>

          <Text
            className='text-4xl text-textSecondary text-center font-semibold mb-4 capitalize'>{recipe.title}</Text>
          <Image
            source={{uri: recipe.image ? recipe.image : defaultImageURL}}
            resizeMode='cover'
            className='h-56 w-full rounded-2xl'
          />
          {
            recipe.description && <Text
              className='text-base text-textSecondary text-justify mt-2 -mb-7'
            >
              {recipe.description}
            </Text>
          }
        </SafeAreaView>

        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.secondary,
            tabBarInactiveTintColor: colors.inactiveIcon,
            sceneStyle: {
              backgroundColor: colors.secondaryLight,
              borderTopWidth: 2,
              borderTopColor: colors.border
            },
            tabBarStyle: {
              backgroundColor: colors.secondaryLight,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              height: 80
            },
            tabBarIconStyle: {
              width: 70,
              height: 40
            }
          }}>
          <Tabs.Screen
            name='ingredients'
            initialParams={{id}}
            options={{
              title: 'Ingredients',
              headerShown: false,
              tabBarIcon: ({color, focused}) => (
                <TabIcon
                  name='Ingredients'
                  icon={icons.ingredients}
                  color={color}
                  focused={focused}/>)

            }}/>
          <Tabs.Screen
            name='instructions'
            initialParams={{id}}
            options={{
              title: 'Instructions',
              headerShown: false,
              tabBarIcon: ({color, focused}) => (
                <TabIcon
                  name='Instructions'
                  icon={icons.instructions}
                  color={color}
                  focused={focused}/>)

            }}/>
        </Tabs>
      </View>

      <DialogModal
        isVisible={modalVisible}
        dialogText={'Do you want to delete this recipe?'}
        confirmButtonName={'Yes'}
        cancelButtonName={'No'}
        handleConfirm={() => removeRecipe()}
        handleCancel={() => {
          setModalVisible(!modalVisible)
        }}
      />
    </>
  )
}

export default RecipeTabLayout