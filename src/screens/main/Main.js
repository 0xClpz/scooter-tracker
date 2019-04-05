import React, {Component} from 'react'
import {MapView, Location, Permissions, TaskManager} from 'expo'
import {Container, Button, Text} from 'native-base'
import {Grid, Row} from 'react-native-easy-grid'
import {GEOTRACKING, STORAGE_KEY} from '../../constants/tasks'
import {AsyncStorage} from 'react-native'
import firebase from 'firebase'

export class Main extends Component {
  state = {}
  async componentDidMount() {
    let {status} = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }

    let location = await Location.getCurrentPositionAsync({})
    this.setState({location})

    const isRiding = await TaskManager.isTaskRegisteredAsync(GEOTRACKING)
    if (isRiding) {
      this.setState({
        riding: true,
      })
    }
  }

  startRide = () => {
    Location.startLocationUpdatesAsync(GEOTRACKING, {
      showsBackgroundLocationIndicator: true,
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 5,
    })

    this.setState({
      riding: true,
    })
  }

  stopRide = async () => {
    Location.stopLocationUpdatesAsync(GEOTRACKING)
    this.setState({riding: false, loading: true})
    const positions = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY))
    const {uid} = firebase.auth().currentUser
    await firebase
      .database()
      .ref(`/rides/${uid}`)
      .push({positions})

    await AsyncStorage.removeItem(STORAGE_KEY)
  }

  render() {
    const {location} = this.state
    return (
      <Container>
        <Grid>
          <Row size={5}>
            <MapView
              style={{flex: 1}}
              region={
                location
                  ? {
                      ...location.coords,
                      latitudeDelta: 0.0001,
                      longitudeDelta: 0.01,
                    }
                  : null
              }
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {location && <MapView.Marker coordinate={location.coords} />}
            </MapView>
          </Row>
          <Row size={1}>
            {this.state.riding ? (
              <Button onPress={this.stopRide}>
                <Text>STOP RIDE</Text>
              </Button>
            ) : (
              <Button onPress={this.startRide}>
                <Text>START RIDE</Text>
              </Button>
            )}
          </Row>
        </Grid>
      </Container>
    )
  }
}
