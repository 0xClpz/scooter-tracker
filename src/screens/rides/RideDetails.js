import React, {Component} from 'react'
import {ScrollView, Dimensions} from 'react-native'
import {getRegionForCoordinates} from '../../utils/utils'
import {RidePolyline} from '../../dumb/RidePolyline'
import {MapView} from 'expo'
import styled from 'styled-components'
import {prop, path} from 'ramda'
import {MoneySaved} from '../stats/MoneySaved'
import {PeakSpeed} from '../stats/PeakSpeed'
import {TotalDistance} from '../stats/TotalDistance'
import {LineChart} from 'react-native-chart-kit'
import {MeanSpeed} from '../stats/MeanSpeed'
import PropTypes from 'prop-types'

const Map = styled(MapView)`
  flex: 1;
  height: 500;
`

// eslint-disable-next-line
const Chart = ({ride}) => {
  return (
    <LineChart
      data={{
        datasets: [
          {
            data: ride.positions.map(p => 3.6 * path(['coords', 'speed'], p)),
          },
        ],
      }}
      width={Dimensions.get('window').width} // from react-native
      height={400}
      yAxisLabel={'Km/h'}
      chartConfig={{
        // backgroundColor: '#e26a00',
        // backgroundGradientFrom: '#fb8c00',
        // backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  )
}

export class RideDetails extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func.isRequired,
    }).isRequired,
  }
  render() {
    const {navigation} = this.props
    const ride = navigation.getParam('ride')
    const coordinates = ride.positions.map(prop('coords'))
    return (
      <ScrollView>
        <Map initialRegion={getRegionForCoordinates(coordinates)}>
          <RidePolyline ride={ride} />
        </Map>
        <MoneySaved rides={[ride]} />
        <PeakSpeed rides={[ride]} />
        <MeanSpeed rides={[ride]} />
        <TotalDistance rides={[ride]} />
      </ScrollView>
    )
  }
}
