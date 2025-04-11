import React from 'react'
import {View, FlatList, Text} from 'react-native'
import ListItem from './ListItem'

function RecipeTab({tabName, data, type}) {
 return (
   <View className='h-full bg-secondaryLight mb-4'>
     {(data && data.length > 0)
       ? <FlatList
         data={data}
         renderItem={({item, index}) => (<ListItem itemText={item} number={type === 'numeric' ? index : null}/>)}/>
       : <Text className='text-xl text-center mt-4'> {`There is no ${tabName.toLowerCase()} yet`}</Text>
     }

   </View>
 )}

export default RecipeTab