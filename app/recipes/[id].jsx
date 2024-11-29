import React, {useEffect, useState} from 'react'
import {View, Text, FlatList, Image, SectionList} from 'react-native'
import {useLocalSearchParams} from 'expo-router'
import useAppwrite from '../../lib/useAppwrite'
import {getFullRecipeById} from '../../lib/arrwrite'
import ListItem from '../../components/ListItem'
import {SafeAreaView} from 'react-native-safe-area-context'

function Recipe() {
  const {id} = useLocalSearchParams()
  const {data: recipe} = useAppwrite(() => getFullRecipeById(id))
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    if (recipe?.ingredients) {
      setIngredients((prev) => [...prev, {data: [{title: 'Ingredients', data: recipe.ingredients}]}])
    }

    if (recipe?.steps) {
      setIngredients((prev) => [...prev, {data: [{title: 'Instructions', data: recipe.steps}]}])
    }
  }, [recipe])

  return (
    <SafeAreaView className='bg-secondary p-4'>
      <SectionList
        sections={ingredients}
        ListHeaderComponent={() => (
          <>
            <Text
              className='text-4xl text-textSecondary text-center font-semibold mb-4 capitalize'>{recipe.title}</Text>
            <Image
              source={{uri: recipe.image}}
              resizeMode='cover'
              className='h-56 w-full mb-2 rounded'
            />
            <Text
              className='text-base text-textSecondary mb-2 text-justify'
            >
              {recipe.description}
            </Text>
          </>
        )}
        renderItem={({item}) => (
          <View style={{boxShadow: 'inset 0px 0px 3px 2px rgba(0, 0, 0, 0.3)'}}
                className='bg-secondaryLight p-3 mb-4 rounded'>
            <Text className='text-2xl mb-2 font-semibold text-gray-800'>{item.title}:</Text>
            <FlatList data={item.data} renderItem={({item}) => (<ListItem itemText={item}/>)}/>
          </View>
        )}
      />

    </SafeAreaView>
  )
}

export default Recipe