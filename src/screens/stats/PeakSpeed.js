import React from 'react'
import {ListItem, Left, Text, Body, Right} from 'native-base'
import PropTypes from 'prop-types'
import {computePeakSpeedForRide} from '../../utils/utils'
import {maxBy} from 'ramda'
import {Speed} from '../../dumb/Speed'

export const PeakSpeed = ({rides}) => {
  const fastestTrip = Object.values(rides).reduce(
    maxBy(ride => computePeakSpeedForRide(ride.positions))
  )

  const peakSpeed = computePeakSpeedForRide(fastestTrip.positions)

  return (
    <ListItem icon>
      <Left>
        <Text>🏎</Text>
      </Left>
      <Body>
        <Text>Peak speed</Text>
      </Body>
      <Right>
        <Text>
          <Speed>{peakSpeed}</Speed>
        </Text>
      </Right>
    </ListItem>
  )
}

PeakSpeed.propTypes = {
  rides: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
}
