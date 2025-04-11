import React from 'react'
import {router} from 'expo-router'
import {Image, TouchableOpacity} from 'react-native'
import icons from '../constants/icons'

function BackButton({color}) {
  return (
    <TouchableOpacity
      className='w-10 py-2 pr-2'
      activeOpacity={0.7}
      onPress={() => router.back()}>
      <Image
        className='w-8 h-6'
        source={icons.leftArrow}
        tintColor={color}
        resizeMethod='contain'
      />
    </TouchableOpacity>
  )
}

export default BackButton