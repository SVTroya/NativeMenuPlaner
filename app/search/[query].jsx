import React, {useEffect} from 'react'
import {FlatList, Text} from 'react-native'
import {useLocalSearchParams} from 'expo-router'
import SearchInput from '../../components/SearchInput'
import RecipeCard from '../../components/RecipeCard'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useGlobalContext} from '../../context/GlobalProvider'
import useAppwrite from '../../lib/useAppwrite'
import {searchRecipesBaseInfoByUser} from '../../lib/arrwrite'

function Search() {
  const {query} = useLocalSearchParams()
  const {user} = useGlobalContext()
  const {data, refetch} = useAppwrite(() => searchRecipesBaseInfoByUser(user.$id, query))

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className='h-full px-4'>
      <SearchInput initialQuery={query}/>
      <FlatList
        className='-mb-10'
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <RecipeCard recipe={item}/>
        )}
        ListEmptyComponent={<Text className={'text-center'}>No Recipes Found</Text>}
      />
    </SafeAreaView>
  )
}

export default Search