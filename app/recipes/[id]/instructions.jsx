import {useLocalSearchParams} from 'expo-router'
import useAppwrite from '../../../lib/useAppwrite'
import {getInstructionsList} from '../../../lib/arrwrite'
import RecipeTab from '../../../components/RecipeTab'

function Instructions() {
  const {id} = useLocalSearchParams()
  const {data: {steps}} = useAppwrite(() => getInstructionsList(id))

  return (
 <RecipeTab tabName='Instructions' data={steps} type='numeric'/>
  )
}

export default Instructions