import React from 'react'
import {View, Text, Image, FlatList} from 'react-native'
import ListItem from './ListItem'

function RecipeCard({recipe}) {
  return (
    <View className='mb-4 rounded-2xl bg-secondary p-4'>
      <Text className='text-4xl text-textSecondary font-semibold mb-2 capitalize'>{recipe.title}</Text>
      <Image
        source={{uri: recipe.image}}
        resizeMode='cover'
        className='h-56 w-full mb-2 rounded'
      />
      <Text
        className='text-base text-textSecondary mb-2 text-justify'
        numberOfLines={4}
      >
        {recipe.description}
      </Text>
      <View style={{boxShadow: 'inset 0px 0px 3px 2px rgba(0, 0, 0, 0.3)'}}
            className='bg-secondaryLight p-3 rounded'>
        <FlatList
          data={recipe.ingredients}
          ListHeaderComponent={() => (
            <Text className='text-2xl mb-2 font-semibold text-gray-800'>Ingredients:</Text>)}
          renderItem={({item}) => (
            <ListItem itemText={item}/>
          )}/>
      </View>
    </View>
  )
}

export default RecipeCard