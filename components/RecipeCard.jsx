import React from 'react'
import {Text, Image, TouchableOpacity} from 'react-native'
import {router} from 'expo-router'
import {defaultImageURL} from '../constants/url'

function RecipeCard({recipe}) {

  return (
    <TouchableOpacity
      className='mb-4 rounded-2xl bg-secondary p-4'
      activeOpacity={0.85}
      onPress={() => {router.push(`recipes/${recipe.$id}/ingredients`)}}
    >
      <Text
        className='text-4xl text-textSecondary font-semibold mb-2 capitalize'
        numberOfLines={3}
      >{recipe.title}</Text>
      <Image
        source={{uri: recipe.image ? recipe.image : defaultImageURL}}
        resizeMode='cover'
        className='h-56 w-full rounded'
      />
      {recipe.description && <Text
        className='text-base text-textSecondary mt-2 text-justify'
        numberOfLines={4}
      >
        {recipe.description}
      </Text>}
    </TouchableOpacity>
  )
}

export default RecipeCard