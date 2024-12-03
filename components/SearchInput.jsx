import {View, TextInput, Image} from 'react-native'
import icons from '../constants/icons'
import colors from '../constants/colors'

function SearchInput({query, onQueryChange}) {

  function handleSearch(text) {
    onQueryChange(text)
  }

  return (
    <View
      className='
      flex flex-row items-center space-x-4 w-full h-14 px-4 bg-primary
      rounded-2xl border-2 border-secondary flex-shrink'>
      <TextInput
        className='text-xl text-gray-800 flex-1 -mt-2'
        value={query}
        placeholder='Search recipe'
        placeholderTextColor={colors.inactiveIcon}
        onChangeText={(e) => handleSearch(e)}
      />

      <Image source={icons.search} tintColor={colors.secondary} className='w-6 h-6' resizeMode='contain'/>
    </View>
  )
}

export default SearchInput