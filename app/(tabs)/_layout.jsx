import React from 'react'
import {View, Text, Image} from 'react-native'
import {Tabs, Redirect} from 'expo-router'
import icons from '../../constants/icons'
import colors from '../../constants/colors'

function TabIcon({icon, color, name, focused}) {
  return (
    <View
      className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMethod='contain'
         tintColor={color}
        className='w-6 h-6'/>
      <Text
        className={`${focused ? 'font-semibold' : 'font-normal'} :  text-xs`}
         style={{
           color: color
         }}
      >
        {name}
      </Text>
    </View>
  )
}

function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.inactiveIcon,
          sceneStyle: {
            backgroundColor: colors.primary
          },
          tabBarStyle: {
            backgroundColor: colors.primary,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            height: 80
          },
          tabBarIconStyle: {
            width: 60,
            height: 40
          }
        }}>
        <Tabs.Screen
          name='recipesList'
          options={{
            title: 'Cookbook',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                name='Cookbook'
                icon={icons.book}
                color={color}
                focused={focused}/>)

          }}/>
        <Tabs.Screen
          name='menu'
          options={{
            title: 'Menu',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                name='Menu'
                icon={icons.menu}
                 color={color}
                focused={focused}/>)

          }}/>
        <Tabs.Screen
          name='settings'
          options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                name='Settings'
                icon={icons.settings}
                color={color}
                focused={focused}/>)

          }}/>
      </Tabs>
    </>
  )
}

export default TabLayout