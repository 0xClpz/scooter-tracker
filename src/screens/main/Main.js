import React, {Component} from 'react'
import {MapView, Location, Permissions, TaskManager} from 'expo'
import {Container, Button, Text} from 'native-base'
import {Grid, Row} from 'react-native-easy-grid'
import {GEOTRACKING, STORAGE_KEY} from '../../constants/tasks'
import {AsyncStorage} from 'react-native'
import firebase from 'firebase'
import {RideView} from './RideView'
import {prop} from 'ramda'

const trackingOptions = {
  showsBackgroundLocationIndicator: true,
  accuracy: Location.Accuracy.BestForNavigation,
  distanceInterval: 5,
}

export class Main extends Component {
  state = {
    riding: false,
    currentRide: [],
    location: null,
  }
  async componentDidMount() {
    let {status} = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }

    const isRiding = await TaskManager.isTaskRegisteredAsync(GEOTRACKING)
    if (isRiding) {
      this.startWatchingAsync()
      this.setState({
        riding: true,
      })
    }

    Location.watchPositionAsync(trackingOptions, location => {
      this.setState({location})
    })
  }

  startRide = () => {
    Location.startLocationUpdatesAsync(GEOTRACKING, trackingOptions)
    this.startWatchingAsync()

    this.setState({
      riding: true,
    })
  }

  startWatchingAsync = () => {
    this.intervalID = setInterval(async () => {
      const positions = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY))
      if (positions.length !== this.state.currentRide.length) {
        this.setState({
          currentRide: positions,
        })
      }
    }, 1000)
  }

  stopRide = async () => {
    this.intervalID && clearInterval(this.intervalID)
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
    const {location, currentRide, riding} = this.state
    const coordinates = currentRide.map(prop('coords'))
    return (
      <Container>
        <Grid>
          <Row size={5}>
            {location && (
              <MapView
                style={{flex: 1}}
                initialRegion={{
                  ...location.coords,
                  latitudeDelta: 0.0001,
                  longitudeDelta: 0.01,
                }}
              >
                <MapView.Marker coordinate={location.coords} />
                {riding && (
                  <MapView.Polyline
                    coordinates={coordinates}
                    strokeWidth={1}
                    strokeColors={['#7F0000']}
                  />
                )}
              </MapView>
            )}
          </Row>
          <Row size={1}>
            {riding ? (
              <RideView ride={currentRide} stopRide={this.stopRide} />
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
