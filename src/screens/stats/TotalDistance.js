import {Body, Left, ListItem, Right, Text} from 'native-base'
import React from 'react'
import PropTypes from 'prop-types'
import {computeDistanceForRide} from '../../utils/utils'
import {Distance} from '../../dumb/Distance'

export const TotalDistance = ({rides}) => {
  const totalDistance = Object.values(rides).reduce(
    (acc, next) => computeDistanceForRide(next.positions) + acc,
    0
  )
  return (
    <ListItem icon>
      <Left>
        <Text>🚗</Text>
      </Left>
      <Body>
        <Text>Total distance</Text>
      </Body>
      <Right>
        <Text>
          <Distance>{totalDistance}</Distance>
        </Text>
      </Right>
    </ListItem>
  )
}

TotalDistance.propTypes = {
  rides: PropTypes.object.isRequired,
}
