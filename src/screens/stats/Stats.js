import React, {Component, Fragment} from 'react'
import {Title, Text} from 'native-base'
import {MoneySaved} from './MoneySaved'
import firebase from 'firebase'
import {Screen} from '../../dumb/Screen'
import {RidesProvider} from '../../providers/RideProvider'
import {TotalDistance} from './TotalDistance'
import {MeanSpeed} from './MeanSpeed'
import {PeakSpeed} from './PeakSpeed'

export class Stats extends Component {
  state = {
    rides: undefined,
  }

  componentDidMount() {
    const {uid} = firebase.auth().currentUser
    firebase
      .database()
      .ref(`/rides/${uid}`)
      .on('value', snap => {
        this.setState({
          rides: snap.val(),
        })
      })
  }

  render() {
    return (
      <RidesProvider>
        {({empty, loading, rides}) => {
          if (loading) {
            return <Text>Loading...</Text>
          }

          if (empty) {
            return (
              <Screen>
                <Text>You didnt record any ride yet, start now!</Text>
              </Screen>
            )
          }

          return (
            <Screen>
              <Fragment>
                <Title>Stats</Title>
                <MoneySaved rides={rides} />
                <TotalDistance rides={rides} />
                <MeanSpeed rides={rides} />
                <PeakSpeed rides={rides} />
              </Fragment>
            </Screen>
          )
        }}
      </RidesProvider>
    )
  }
}
