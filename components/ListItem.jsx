import React from 'react'
import {View, Text} from 'react-native'

function ListItem({itemText, number}) {
  return (
    <View className='mt-3 p-1 bg-listItem shadow shadow-stone-500 rounded mx-3 flex flex-row gap-1'>
      <Text
        className={`${number === null ? 'text-2xl font-semibold' : 'text-lg font-bold'} leading-6 text-gray-800`}>{number !== null ? `${number + 1}.` : '\u2022'}</Text>

      <Text className='flex-shrink text-lg leading-6 text-gray-800 font-semibold'>{itemText}</Text>
    </View>
  )
}

export default ListItem