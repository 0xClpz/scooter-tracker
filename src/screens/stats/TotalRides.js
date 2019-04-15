import {Body, Left, ListItem, Right, Text} from 'native-base'
import React from 'react'
import PropTypes from 'prop-types'

export const TotalRides = ({rides}) => {
  return (
    <ListItem icon>
      <Left>
        <Text>💯</Text>
      </Left>
      <Body>
        <Text>Total number of rides</Text>
      </Body>
      <Right>
        <Text>{Object.keys(rides).length}</Text>
      </Right>
    </ListItem>
  )
}

TotalRides.propTypes = {
  rides: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
}
