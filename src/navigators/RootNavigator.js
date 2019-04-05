import {createSwitchNavigator} from 'react-navigation'
import {MainNavigator} from './MainNavigator'
import {AuthNavigator} from './AuthNavigator'
import {AuthLoading} from './AuthLoading'

export const RootNavigator = createSwitchNavigator(
  {
    Main: MainNavigator,
    Auth: AuthNavigator,
    AuthLoading: AuthLoading,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)
