import React, {useState} from 'react'
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native'
import colors from '../constants/colors'
import icons from '../constants/icons'

function FormField({title, value, placeholder, handleChangeValue, otherStyles, fieldStyles, ...props}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`flex gap-1 text-gray-800 h-fit ${otherStyles}`}>
      {title !== null && <Text className='text-base flex-shrink font-semibold'>{title}</Text>}

      <View
        className={`flex-row w-full flex-shrink h-16 px-4 bg-input rounded-xl border-2 border-gray-400 focus:border-secondary items-center ${fieldStyles}`}
      >
        <TextInput
          className='flex-1 h-full text-xl text-gray-800 font-semibold justify-center leading-6'
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          onChangeText={handleChangeValue}
          line
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />
        {title === 'Password' &&
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword)
            }}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className='w-8 h-8'
              resizeMode='contain'
            />
          </TouchableOpacity>}
      </View>
    </View>
  )
}

export default FormField