import {SplashScreen, Stack} from 'expo-router'
import {useFonts} from 'expo-font'
import '../global.css'
import {useEffect} from 'react'
import GlobalProvider from '../context/GlobalProvider'

function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-SemiBoldItalic': require('../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
    'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf')
  })

  useEffect(() => {
    if (error) throw error

    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, error])


  if (!fontsLoaded) return null

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name='index' options={{headerShown: false}}/>
        <Stack.Screen name='(auth)' options={{headerShown: false}}/>
        <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
        <Stack.Screen name='recipes/[id]' options={{headerShown: false}}/>
      </Stack>
    </GlobalProvider>
  )
}

export default RootLayout