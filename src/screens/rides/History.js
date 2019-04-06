import React, {Component, Fragment} from 'react'
import {FlatList} from 'react-native'
import {RidesProvider} from '../../providers/RideProvider'
import {Text, Title, ListItem, Body, Right} from 'native-base'
import {Screen} from '../../dumb/Screen'
import {
  computeDistanceForRide,
  computeDurationForRide,
  computePriceForRide,
} from '../../utils/utils'
import {Money} from '../../dumb/Money'
import {DateTime, Duration} from 'luxon'
import {Distance} from '../../dumb/Distance'
import PropTypes from 'prop-types'

const Row = ({item}) => {
  const price = computePriceForRide(item.positions)

  const duration = Duration.fromObject({
    seconds: computeDurationForRide(item.positions),
  }).toFormat('mm:ss')

  const date = DateTime.fromMillis(item.positions[0].timestamp)
    .setLocale('fr')
    .toLocaleString(DateTime.DATETIME_SHORT)

  const distance = computeDistanceForRide(item.positions)

  return (
    <ListItem icon>
      <Body>
        <Text>
          {date} - {duration} - <Distance>{distance}</Distance>
        </Text>
      </Body>
      <Right>
        <Text>
          <Money>{price}</Money>
        </Text>
      </Right>
    </ListItem>
  )
}

Row.propTypes = {
  item: PropTypes.object.isRequired,
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
            <Screen>
              <Fragment>
                <Title>Rides History</Title>
                <FlatList
                  keyExtractor={item => item[0]}
                  renderItem={({item}) => <Row item={item[1]} />}
                  data={Object.entries(Object.values(rides)).reverse()}
                />
              </Fragment>
            </Screen>
          )
        }}
      </RidesProvider>
    )
  }
}
