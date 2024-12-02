import colors from '../../../constants/colors'
import {Tabs, useLocalSearchParams} from 'expo-router'
import icons from '../../../constants/icons'
import {Image, Text, View} from 'react-native'
import TabIcon from '../../../components/TabIcon'
import {SafeAreaView} from 'react-native-safe-area-context'
import useAppwrite from '../../../lib/useAppwrite'
import {getBaseRecipeInfo} from '../../../lib/arrwrite'

function RecipeTabLayout() {
  const {id} = useLocalSearchParams()
  const {data: recipe} = useAppwrite(() => getBaseRecipeInfo(id))

  return (
    <View className='h-full bg-secondary'>
      <SafeAreaView className='px-4'>
        <Text
          className='text-4xl text-textSecondary text-center font-semibold mb-4 capitalize'>{recipe.title}</Text>
        <Image
          source={{uri: recipe.image}}
          resizeMode='cover'
          className='h-56 w-full mb-2 rounded'
        />
        <Text
          className='text-base text-textSecondary text-justify -mb-7'
        >
          {recipe.description}
        </Text>
      </SafeAreaView>

      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.inactiveIcon,
          sceneStyle: {
            backgroundColor: colors.secondaryLight,
          },
          tabBarStyle: {
            backgroundColor: colors.secondaryLight,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            height: 80,
          },
          tabBarIconStyle: {
            width: 70,
            height: 40
          }
        }}>
        <Tabs.Screen
          name='ingredients'
          initialParams={{ id }}
          options={{
            title: 'Ingredients',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                name='Ingredients'
                icon={icons.book}
                color={color}
                focused={focused}/>)

          }}/>
        <Tabs.Screen
          name='instructions'
          initialParams={{ id }}
          options={{
            title: 'Instructions',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                name='Instructions'
                icon={icons.menu}
                color={color}
                focused={focused}/>)

          }}/>
      </Tabs>
    </View>

  )
}

export default RecipeTabLayout