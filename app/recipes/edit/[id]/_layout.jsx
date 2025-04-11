import NewEdit from '../../new'
import {useLocalSearchParams} from 'expo-router'
import useAppwrite from '../../../../lib/useAppwrite'
import {getFullRecipeInfo} from '../../../../lib/arrwrite'

function RecipeEditLayout() {
  const {id} = useLocalSearchParams()
  const {data: recipe} = useAppwrite(() => getFullRecipeInfo(id))

  return (
    <NewEdit
      recipe={recipe}/>
  )
}

export default RecipeEditLayout