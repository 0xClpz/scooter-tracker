import {createStackNavigator} from 'react-navigation'
import {SignIn} from '../screens/auth/SignIn'
import {SignUp} from '../screens/auth/SignUp'

export const AuthNavigator = createStackNavigator({
  SignIn: {screen: SignIn},
  SignUp: {screen: SignUp},
})
