import RecipeTab from '../../../components/RecipeTab'
import {useLocalSearchParams} from 'expo-router'
import useAppwrite from '../../../lib/useAppwrite'
import {getIngredientsList} from '../../../lib/arrwrite'

function Ingredients() {
  const {id} = useLocalSearchParams()
  const {data: {ingredients}} = useAppwrite(() => getIngredientsList(id))

  return (
      <RecipeTab data={ingredients}/>
  )
}

export default Ingredients