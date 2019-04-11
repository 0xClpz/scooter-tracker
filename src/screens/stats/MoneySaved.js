import React from 'react'
import {ListItem, Left, Text, Body, Right} from 'native-base'
import PropTypes from 'prop-types'
import {computePriceForRide} from '../../utils/utils'
import {Money} from '../../dumb/Money'

export const MoneySaved = ({rides}) => {
  const totalSaved = Object.values(rides).reduce(
    (acc, ride) => acc + computePriceForRide(ride.positions),
    0
  )

  return (
    <ListItem icon>
      <Left>
        <Text>💵</Text>
      </Left>
      <Body>
        <Text>Money saved</Text>
      </Body>
      <Right>
        <Text>
          <Money>{totalSaved}</Money>
        </Text>
      </Right>
    </ListItem>
  )
}

MoneySaved.propTypes = {
  rides: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
}
