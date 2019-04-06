import {createBottomTabNavigator} from 'react-navigation'
import {Main} from '../screens/main/Main'
import {Settings} from '../screens/settings/Settings'
import {Stats} from '../screens/stats/Stats'
import {History} from '../screens/rides/History'

export const MainNavigator = createBottomTabNavigator({
  Main,
  Stats,
  History,
  Settings,
})
