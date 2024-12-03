import {FlatList, Text, Image, TouchableOpacity, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {searchRecipesBaseInfoByUser} from '../../lib/arrwrite'
import {useGlobalContext} from '../../context/GlobalProvider'
import RecipeCard from '../../components/RecipeCard'
import useAppwrite from '../../lib/useAppwrite'
import SearchInput from '../../components/SearchInput'
import React, {useEffect, useState} from 'react'
import icons from '../../constants/icons'
import colors from '../../constants/colors'
import {router} from 'expo-router'

function RecipeList() {
  const [query, setQuery] = useState('')
  const {user} = useGlobalContext()
  const {data, refetch} = useAppwrite(() => searchRecipesBaseInfoByUser(user.$id, query))

  useEffect(() => {
    if (data) refetch()
  }, [query])

  return (
    <SafeAreaView className='h-full px-4 relative mt-2'>
      <View className='flex flex-row gap-2 items-center w-full mb-4'>
        <Image
          source={icons.logo}
          className='w-14 h-14'
        />
        <SearchInput query={query} onQueryChange={setQuery}/>
      </View>

      <FlatList
        className='-mb-10'
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <RecipeCard recipe={item}/>
        )}
        ListEmptyComponent={<Text className={'text-center'}>No Recipes Found</Text>}
      />

      <TouchableOpacity
        className='w-16 h-16 absolute right-4 bottom-4 rounded-full bg-primary border border-border flex justify-center items-center'
        activeOpacity={0.7}
        onPress={() => router.push('/recipes/new')}
      >
        <Image
          className='w-8 h-8'
          source={icons.plus}
          tintColor={colors.secondary}
          resizeMethod='contain'
        />
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default RecipeList