import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import {Main} from '../screens/main/Main'
import {Settings} from '../screens/settings/Settings'
import {Stats} from '../screens/stats/Stats'
import {History} from '../screens/rides/History'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import {RideDetails} from '../screens/rides/RideDetails'

const IconMap = {
  Main: 'ios-add',
  Stats: 'ios-stats',
  History: 'ios-journal',
  Settings: 'ios-cog',
}

export const MainNavigator = createBottomTabNavigator(
  {
    Main,
    Stats,
    History: createStackNavigator({
      RidesHistory: History,
      RideDetails,
    }),
    Settings,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      // eslint-disable-next-line
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state
        // You can return any component that you like here!
        return (
          <Ionicons name={IconMap[routeName]} size={25} color={tintColor} />
        )
      },
    }),
  }
)
