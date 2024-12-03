import React from 'react'
import {TouchableOpacity, Text} from 'react-native'

function CustomButton({title, handlePress, containerStyles, textStyles, isLoading}) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-secondary rounded-xl justify-center items-center min-h-14 ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
    >
      <Text className={`text-primary font-semibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton