import {Col} from 'react-native-easy-grid'
import {Button, Text} from 'native-base'
import {Money} from '../../dumb/Money'
import {computeDistanceForRide, computePriceForRide} from '../../utils/utils'
import React from 'react'
import {Distance} from '../../dumb/Distance'
import PropTypes from 'prop-types'

export const RideView = ({ride = [], stopRide}) => {
  return (
    <>
      <Col>
        <Button onPress={stopRide} danger>
          <Text>STOP RIDE</Text>
        </Button>
      </Col>
      <Col>
        <Text>
          <Money>{computePriceForRide(ride)}</Money>
          <Distance>{computeDistanceForRide(ride)}</Distance>
        </Text>
      </Col>
    </>
  )
}

RideView.propTypes = {
  ride: PropTypes.array.isRequired,
  stopRide: PropTypes.func.isRequired,
}
