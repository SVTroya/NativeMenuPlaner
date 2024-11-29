import React from 'react'
import {Text, Image, TouchableOpacity} from 'react-native'
import {router} from 'expo-router'

function RecipeCard({recipe}) {
  return (
    <TouchableOpacity
      className='mb-4 rounded-2xl bg-secondary p-4'
      activeOpacity={0.85}
      onPress={() => {router.push(`/recipes/${recipe.$id}`)}}
    >
      <Text
        className='text-4xl text-textSecondary font-semibold mb-2 capitalize'
        numberOfLines={3}
      >{recipe.title}</Text>
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
    </TouchableOpacity>
  )
}

export default RecipeCard