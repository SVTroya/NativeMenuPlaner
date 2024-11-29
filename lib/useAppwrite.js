import {Alert} from 'react-native'
import {useEffect, useState} from 'react'

function useAppwrite(fn) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchData() {
    setIsLoading(true)
    try {
      const recipes = await fn()
      setData(recipes)
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData().catch((error) => console.error(error.message))
  }, [])

  function refetch() {
    fetchData().catch((error) => console.error(error.message))
  }

  return {data, isLoading, refetch}
}

export default useAppwrite