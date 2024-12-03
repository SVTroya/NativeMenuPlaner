import React, {useState} from 'react'
import {View, Text, ScrollView, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import {Link, router} from 'expo-router'
import Logo from '../../components/Logo'
import {createUser, getCurrentUser, signIn} from '../../lib/arrwrite'
import {useGlobalContext} from '../../context/GlobalProvider'

function SignIn() {
  const {setUser, setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState({email: 'email@hmail.com', password: '12345678'})
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submit() {
    if (!form.email.trim() || !form.password.trim()) {
      Alert.alert('Error', 'E-mail and password are mandatory!')
    }

    setIsSubmitting(true)

    try{
      await signIn(form.email.trim(), form.password.trim())
      setUser(getCurrentUser())
      setIsLoggedIn(true)

      router.replace('/recipesList')
    }
    catch(error){
      Alert.alert('Error', error.message)
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full p-0'>
      <ScrollView className='h-full'>
        <View className='w-full min-h-[70vh] justify-center px-4 my-6'>
          <Logo/>
          <Text className='text-2xl font-semibold mt-10 text-gray-700'>
            Log in to Menu Planner
          </Text>

          <FormField
            title='E-mail'
            value={form.email}
            placeholder='E-mail'
            handleChangeValue={(e) => {
              setForm({...form, email: e})
            }}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            value={form.password}
            placeholder='Password'
            handleChangeValue={(e) => {
              setForm({...form, password: e})
            }}
            otherStyles='mt-7'
          />

          <CustomButton
            title='Sin In'
            handlePress={submit}
            containerStyles='mt-7 min-h-16'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-800'>
              Don't have account?
            </Text>
            <Link
              href='/sign-up'
              replace={true}
              className='text-lg font-semibold text-secondary'
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn