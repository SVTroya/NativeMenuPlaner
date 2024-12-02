import React, {useState} from 'react'
import {View, TextInput, TouchableOpacity, Image} from 'react-native'
import icons from '../constants/icons'
import {router, usePathname} from 'expo-router'
import colors from '../constants/colors'

function SearchInput({initialQuery}) {
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery || '')

  function handleSearch() {
    if (query.trim() !== '')
      if (pathname.startsWith('/search')) {
        console.log('search next')
        router.setParams({query})
      }
      else router.push(`/search/${query}`)
  }

  return (
    <View
      className='
      flex flex-row items-center space-x-4 w-full h-16 px-4 bg-secondaryLight
      rounded-2xl mb-4 border-2 border-secondary'>
      <TextInput
        className='text-xl text-gray-800 flex-1 -mt-2'
        value={query}
        placeholder='Search recipe'
        placeholderTextColor={colors.inactiveIcon}
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.search} tintColor={colors.secondary} className='w-6 h-6' resizeMode='contain'/>
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput