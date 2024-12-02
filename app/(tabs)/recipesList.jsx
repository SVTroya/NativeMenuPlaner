import {FlatList} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {getAllRecipesBaseInfoByUser} from '../../lib/arrwrite'
import {useGlobalContext} from '../../context/GlobalProvider'
import RecipeCard from '../../components/RecipeCard'
import useAppwrite from '../../lib/useAppwrite'
import SearchInput from '../../components/SearchInput'

function RecipesList() {
  const {user} = useGlobalContext()
  const { data } = useAppwrite(() => getAllRecipesBaseInfoByUser(user.$id))

  return (
    <SafeAreaView className='h-full px-4'>
      <SearchInput/>
      <FlatList
        className='-mb-10'
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