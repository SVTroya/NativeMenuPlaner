import React from 'react'
import {Stack} from 'expo-router'
import colors from '../../constants/colors'
import {StatusBar} from 'expo-status-bar'

function AuthLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='sign-in'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='sign-up'
          options={{
            headerShown: false
          }}
        />
      </Stack>

      <StatusBar
        backgroundColor={colors.primary}
        style='dark'
      />
    </>
  )
}

export default AuthLayout