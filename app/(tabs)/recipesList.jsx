import React, {useEffect, useState} from 'react'
import {View, Text, FlatList, Image, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {getAllRecipesByUser} from '../../lib/arrwrite'
import {useGlobalContext} from '../../context/GlobalProvider'
import RecipeCard from '../../components/RecipeCard'

function RecipesList() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const {user} = useGlobalContext()

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const recipes = await getAllRecipesByUser(user.$id)
        setData(recipes)
      } catch (error) {
        Alert.alert('Error', error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <SafeAreaView className='h-full p-4'>
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <RecipeCard recipe={item}/>
        )}
      />
    </SafeAreaView>
  )
}

export default RecipesList