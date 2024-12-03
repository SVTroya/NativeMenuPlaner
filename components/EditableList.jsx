import {Alert, Image, Text, TouchableOpacity, View} from 'react-native'
import {ID} from 'react-native-appwrite'
import {Pressable} from 'expo-router/build/views/Pressable'
import React, {useState} from 'react'
import icons from '../constants/icons'
import colors from '../constants/colors'
import ItemModal from './ItemModal'

function ListRow({rowData, number, handleEdit, handleRemove}) {
  return (
    <View className='w-full mb-2 flex-row gap-1 justify-between'>
      <View className='flex flex-shrink flex-row gap-1'>
        <Text
          className={`${number === null ? 'text-2xl' : 'text-lg'} leading-6 text-gray-800 font-semibold`}>{number !== null ? `${number + 1}.` : '\u2022'}</Text>
        <Text className='flex-shrink text-lg leading-6 text-gray-800 font-semibold'>{rowData}</Text>
      </View>

      <View className='flex flex-row gap-4'>
        <TouchableOpacity
          onPress={() => handleEdit(rowData)}
        >
          <Image
            className='w-6 h-6'
            source={icons.edit}
            resizeMode='contain'
            tintColor={colors.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRemove()}
        >
          <Image
            className='w-6 h-6'
            source={icons.remove}
            resizeMode='contain'
            tintColor='#F00'
          />
        </TouchableOpacity>
      </View>


    </View>
  )
}

function EditableList({name, data, handleAdd, handleChange, type}) {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalInitialValue, setModalInitialValue] = useState('')
  const [modalIndex, setModalIndex] = useState(-1)

  function handleEdit(initialValue, index) {
    setModalInitialValue(initialValue)
    setModalIndex(index)
    setModalVisible(true)
  }

  function handleListItemChange(newValue, index) {
    if (!(index >= 0)) {
      Alert.alert('Can\'t edit value', `Index can't be ${index}`)
      return
    }

    const newList = [...data]
    newList[index] = newValue
    const newListObject = name === 'Ingredient' ? {ingredients: newList} : {steps: newList}
    handleChange(newListObject)
  }

  function handleListItemRemove(index) {
    if (!(index >= 0)) {
      Alert.alert('Can\'t remove value', `Index can't be ${index}`)
      return
    }

    const newList = [...data]
    newList.splice(index, 1)
    const newListObject = name === 'Ingredient' ? {ingredients: newList} : {steps: newList}
    handleChange(newListObject)
  }

  function listMockup() {
    return data.map((item, index) => (
      <ListRow
        key={ID.unique()}
        rowData={item}
        number={type === 'numeric' ? index : null}
        handleEdit={() => handleEdit(item, index)}
        handleRemove={() => handleListItemRemove(index)}
      />
    ))
  }

  return (
    <>
      <View className='min-h-12 mt-4'>
        <Text className='text-base flex-shrink font-semibold'>{name}s</Text>
        <View className='w-full p-4 bg-input rounded-xl border-2 border-gray-400'>
          {listMockup()}
          <Pressable
            className={`${data.length === 0 ? 'my-2' : 'mt-2'}`}
            onPress={() => setModalVisible(true)}
          >
            <Text className='text-secondary font-semibold w-full'>+ {name}</Text>
          </Pressable>
        </View>
      </View>

      <ItemModal
        name={name}
        isVisible={modalVisible}
        initialValue={modalInitialValue}
        index={modalIndex}
        handleAdd={handleAdd}
        handleChange={handleListItemChange}
        handleClose={() => {
          setModalVisible(!modalVisible)
          setModalInitialValue('')
        }}/>
    </>
  )
}

export default EditableList