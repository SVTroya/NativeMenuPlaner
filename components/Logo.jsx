import React from 'react'
import {View, Text, Image} from 'react-native'
import icons from '../constants/icons'

function Logo() {
 return (
   <View className='flex-row items-center gap-2'>
     <Image
       source={icons.logo}
       className='w-24 h-24'
     />
     <Text className='text-header font-nunito-bold font-bold text-gray-800 pt-4'>
       Menu{'\n'}Planner
     </Text>
   </View>
 )}

export default Logo