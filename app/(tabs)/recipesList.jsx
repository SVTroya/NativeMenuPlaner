import {FlatList} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {getAllBaseRecipesByUser} from '../../lib/arrwrite'
import {useGlobalContext} from '../../context/GlobalProvider'
import RecipeCard from '../../components/RecipeCard'
import useAppwrite from '../../lib/useAppwrite'

function RecipesList() {
  const {user} = useGlobalContext()
  const { data } = useAppwrite(() => getAllBaseRecipesByUser(user.$id))

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