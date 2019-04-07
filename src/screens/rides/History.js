import React, {Component, Fragment} from 'react'
import {FlatList, View, ActionSheetIOS} from 'react-native'
import {RidesProvider} from '../../providers/RideProvider'
import {Text, Title, H3} from 'native-base'
import {MapView} from 'expo'
import {Screen} from '../../dumb/Screen'
import {
  computeDistanceForRide,
  computeDurationForRide,
  computePriceForRide,
  getRegionForCoordinates,
} from '../../utils/utils'
import {Money} from '../../dumb/Money'
import {DateTime, Duration} from 'luxon'
import {formatDistance} from '../../dumb/Distance'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {prop} from 'ramda'
import firebase from 'firebase'

const Map = styled(MapView)`
  flex: 1;
  height: 150;
`

const Stats = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: rgb(243, 245, 246);
  padding: 10px 0;
`

const DateRow = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 24px;
  background-color: white;
`

const StatsItemContainer = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Container = styled.TouchableOpacity`
  flex: 1;
  margin-bottom: 20px;
  border-radius: 10;
  elevation: 1;
`

const getHourFromMs = ms =>
  DateTime.fromMillis(ms).toLocaleString(DateTime.TIME_24_SIMPLE)

const RideCard = ({item, deleteFunc}) => {
  const price = computePriceForRide(item.positions)

  const duration = Duration.fromObject({
    seconds: computeDurationForRide(item.positions),
  }).toFormat('mm:ss')

  const date = DateTime.fromMillis(item.positions[0].timestamp)
    .setLocale('fr')
    .toLocaleString(DateTime.DATE_SHORT)

  const distance = computeDistanceForRide(item.positions)

  const coordinates = item.positions.map(prop('coords'))
  return (
    <Container
      as={deleteFunc ? undefined : View}
      activeOpacity={0.5}
      onLongPress={
        deleteFunc
          ? () => {
              ActionSheetIOS.showActionSheetWithOptions(
                {
                  options: ['Cancel', 'Remove'],
                  destructiveButtonIndex: 1,
                  cancelButtonIndex: 0,
                },
                buttonIndex => {
                  if (buttonIndex === 1) {
                    deleteFunc && deleteFunc()
                    /* destructive action */
                  }
                }
              )
            }
          : null
      }
    >
      <Map
        pitchEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
        initialRegion={getRegionForCoordinates(coordinates)}
      >
        <MapView.Marker coordinate={coordinates[0]} />
        <MapView.Marker coordinate={coordinates[coordinates.length - 1]} />
        <MapView.Polyline
          coordinates={coordinates}
          strokeWidth={1}
          strokeColors={['#7F0000']}
        />
      </Map>
      <Stats>
        <StatsItemContainer>
          <Text>🗾</Text>
          <H3>{formatDistance(distance)}</H3>
          <Text>Distance</Text>
        </StatsItemContainer>
        <StatsItemContainer>
          <Text>🕑</Text>
          <H3>{duration}</H3>
          <Text>Time</Text>
        </StatsItemContainer>
      </Stats>
      <DateRow>
        <View>
          <H3>{date}</H3>
          <Text>
            {`${getHourFromMs(item.positions[0].timestamp)} - ${getHourFromMs(
              item.positions[item.positions.length - 1].timestamp
            )}`}
          </Text>
        </View>
        <View>
          <Text bold>
            <Money>{price}</Money>
          </Text>
        </View>
      </DateRow>
    </Container>
  )
}

RideCard.propTypes = {
  item: PropTypes.object.isRequired,
  deleteFunc: PropTypes.func,
}

export class History extends Component {
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
            <Screen padding color={'rgb(240, 241, 243)'}>
              <Fragment>
                <Title>Rides History</Title>
                <FlatList
                  removeClippedSubviews={false}
                  keyExtractor={item => item[0]}
                  renderItem={({item}) => (
                    <RideCard
                      item={item[1]}
                      deleteFunc={() => {
                        firebase
                          .database()
                          .ref(
                            `/rides/${firebase.auth().currentUser.uid}/${
                              item[0]
                            }`
                          )
                          .remove()
                      }}
                    />
                  )}
                  data={Object.entries(rides).reverse()}
                />
              </Fragment>
            </Screen>
          )
        }}
      </RidesProvider>
    )
  }
}
