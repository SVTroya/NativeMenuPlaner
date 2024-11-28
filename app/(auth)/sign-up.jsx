import React, {useState} from 'react'
import {View, Text, ScrollView, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import {Link, router} from 'expo-router'
import Logo from '../../components/Logo'
import {createUser} from '../../lib/arrwrite'
import {useGlobalContext} from '../../context/GlobalProvider'

function SignUp() {
  const {setUser, setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState({username: '', email: '', password: ''})
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submit() {
    if (!form.email.trim() || !form.username.trim() || !form.password.trim()) {
      Alert.alert('Error', 'Please fill in all fields')
    }

    setIsSubmitting(true)

    try {
      const user = await createUser(form.email.trim(), form.password.trim(), form.username.trim())
      setUser(user)
      setIsLoggedIn(true)

      router.replace('/recipesList')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full p-0'>
      <ScrollView className='h-full'>
        <View className='w-full min-h-[70vh] justify-center px-4 my-6'>
          <Logo/>
          <Text className='text-2xl font-semibold mt-10 text-gray-700'>
            Sign Up to Menu Planner
          </Text>

          <FormField
            title='Username'
            value={form.username}
            placeholder='Username'
            handleChangeValue={(e) => {
              setForm({...form, username: e})
            }}
            otherStyles='mt-10'
          />

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
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-800'>
              Already have an account?
            </Text>
            <Link
              href='/sign-in'
              replace={true}
              className='text-lg font-semibold text-secondary'
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp