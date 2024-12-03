import React from 'react'
import {View, Text, Image} from 'react-native'

function TabIcon({icon, color, name, focused}) {
 return (
   <View
     className='items-center justify-center gap-2'>
     <Image
       source={icon}
       resizeMethod='contain'
       tintColor={color}
       className='w-7 h-7'/>
     <Text
       className={`${focused ? 'font-semibold' : 'font-normal'} :  text-xs`}
       style={{
         color: color
       }}
     >
       {name}
     </Text>
   </View>
 )}

export default TabIcon