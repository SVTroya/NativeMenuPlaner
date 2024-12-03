import React from 'react'
import {View, FlatList} from 'react-native'
import ListItem from './ListItem'

function RecipeTab({data, type}) {
 return (
   <View className='h-full bg-secondaryLight mb-4'>
     <FlatList
       data={data}
       renderItem={({item, index}) => (<ListItem itemText={item} number={type === 'numeric' ? index : null}/>)}/>
   </View>
 )}

export default RecipeTab