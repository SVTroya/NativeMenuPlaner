import {StatusBar} from 'expo-status-bar'
import {Image, ScrollView, Text, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import images from '../constants/images'
import colors from '../constants/colors'
import CustomButton from '../components/CustomButton'
import {Redirect, router} from 'expo-router'
import 'react-native-url-polyfill/auto'
import React from 'react'
import Logo from '../components/Logo'
import {useGlobalContext} from '../context/GlobalProvider'

export default function App() {
  const {isLoggedIn, isLoading} = useGlobalContext()
  if(!isLoading && isLoggedIn) return <Redirect href='/recipesList'/>

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView
        contentContainerStyle={{
          height: '100%'
        }}>
        <View className='w-full min-h-[85vh] items-center justify-center px-4'>
          <Logo/>
          <Image
            source={images.home}
            resizeMode='cover'
            className='w-full h-[300px] border-6 border-gray-500 rounded-3xl my-8'
          />
          <Text className='text-3xl text-gray-800  font-mon-semibold-it font-semibold text-center'>
            Your Meals, Your Rules:{'\n'} Plan, Create, Enjoy
          </Text>
          <Text className='text-sm text-gray-500 mt-7 text-center'>From Vision to Plate: Elevate Your Dining
            Experience
          </Text>
          <CustomButton
            title='Continue with E-mail'
            handlePress={() => {
              router.push('/sign-in')
            }}
            containerStyles='w-full mt-7'
          />
        </View>
      </ScrollView>
      <StatusBar
        backgroundColor={colors.primary}
        style='dark'
      />
    </SafeAreaView>)
}