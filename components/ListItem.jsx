import React from 'react'
import {View, Text} from 'react-native'

function ListItem({itemText}) {
  return (
    <View className='my-1 p-1 bg-listItem shadow shadow-stone-500 rounded mx-3 flex flex-row gap-1'>
      <Text className='text-2xl leading-6 text-gray-800 font-semibold'>&#8226;</Text>
      <Text className='flex-shrink text-lg leading-6 text-gray-800 font-semibold'>{itemText}</Text>
    </View>
  )
}

export default ListItem