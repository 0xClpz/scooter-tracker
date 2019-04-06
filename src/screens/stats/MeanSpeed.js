import React from 'react'
import {ListItem, Left, Text, Body, Right} from 'native-base'
import PropTypes from 'prop-types'
import {computeMeanSpeedForRide} from '../../utils/utils'
import {mean} from 'ramda'
import {Speed} from '../../dumb/Speed'

export const MeanSpeed = ({rides}) => {
  const meanSpeed = mean(
    Object.values(rides).map(rides => computeMeanSpeedForRide(rides.positions))
  )

  return (
    <ListItem icon>
      <Left>
        <Text>🚇</Text>
      </Left>
      <Body>
        <Text>Mean speed</Text>
      </Body>
      <Right>
        <Text>
          <Speed>{meanSpeed}</Speed>
        </Text>
      </Right>
    </ListItem>
  )
}

MeanSpeed.propTypes = {
  rides: PropTypes.object.isRequired,
}
