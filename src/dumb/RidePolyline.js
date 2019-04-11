import {MapView} from 'expo'
import React from 'react'
import {prop} from 'ramda'
import PropTypes from 'prop-types'

export const RidePolyline = ({ride}) => {
  const coordinates = ride.positions.map(prop('coords'))
  return (
    <>
      <MapView.Marker coordinate={coordinates[0]} />
      <MapView.Marker coordinate={coordinates[coordinates.length - 1]} />
      <MapView.Polyline
        coordinates={coordinates}
        strokeWidth={1}
        strokeColors={['#7F0000']}
      />
    </>
  )
}

RidePolyline.propTypes = {
  ride: PropTypes.object.isRequired,
}
