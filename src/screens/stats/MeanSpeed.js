import React from 'react'
import {ListItem, Left, Text, Body, Right} from 'native-base'
import PropTypes from 'prop-types'
import {mean, flatten, path} from 'ramda'
import {Speed} from '../../dumb/Speed'

export const MeanSpeed = ({rides}) => {
  const meanSpeed = mean(
    flatten(
      Object.values(rides).map(ride =>
        ride.positions.map(path(['coords', 'speed']))
      )
    )
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
  rides: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
}
