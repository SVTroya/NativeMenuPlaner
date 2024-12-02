import React from 'react'
import {View, FlatList} from 'react-native'
import ListItem from './ListItem'

function RecipeTab({data}) {
 return (
   <View className='h-full bg-secondaryLight py-3 mb-4'>
     <FlatList
       data={data}
       renderItem={({item}) => (<ListItem itemText={item}/>)}/>
   </View>
 )}

export default RecipeTab