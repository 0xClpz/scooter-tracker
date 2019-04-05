import {createBottomTabNavigator} from 'react-navigation'
import {Main} from '../screens/main/Main'
import {Settings} from '../screens/settings/Settings'

export const MainNavigator = createBottomTabNavigator({
  Main,
  Settings,
})
