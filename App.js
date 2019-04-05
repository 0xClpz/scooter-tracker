import React, {Component} from 'react'
import firebase from 'firebase'
import {createAppContainer} from 'react-navigation'
import {firebaseConfig} from './src/constants/firebase'
import {RootNavigator} from './src/navigators/RootNavigator'
import {AppLoading, Font, TaskManager} from 'expo'
import {Ionicons} from '@expo/vector-icons'
import {GEOTRACKING, STORAGE_KEY} from './src/constants/tasks'
import {AsyncStorage} from 'react-native'

// Geotracking setup
TaskManager.defineTask(GEOTRACKING, async ({data: {locations}, error}) => {
  if (error) {
    // check `error.message` for more details.
    return
  }
  let currentValues = null
  try {
    currentValues = JSON.parse((await AsyncStorage.getItem(STORAGE_KEY)) || [])
  } catch (e) {
    currentValues = []
  }
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(currentValues.concat(locations))
  )
})

// Firebase setup
firebase.initializeApp(firebaseConfig)

// App setup
const AppContaienr = createAppContainer(RootNavigator)

class App extends Component {
  state = {
    isReady: false,
  }

  async loadResources() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadResources}
          onFinish={() => this.setState({isReady: true})}
        />
      )
    }

    return <AppContaienr />
  }
}

export default App
