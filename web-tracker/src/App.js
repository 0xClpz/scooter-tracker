import React, {useState, useEffect} from 'react'
import 'leaflet/dist/leaflet.css'
import './App.css'
import {
  Map as LeafletMap,
  Marker,
  Circle,
  Popup,
  TileLayer,
} from 'react-leaflet'
import styled from 'styled-components'
import firebase from 'firebase'

const Map = styled(LeafletMap)`
  height: 100vh;
  width: 100%:
`

const toLeafLetPos = ({
  latitude,
  longitude,
  lat = latitude,
  lng = longitude,
}) => ({
  lat,
  lng,
})

const App = () => {
  const [position, setPosition] = useState(null)

  useEffect(() => {
    firebase
      .database()
      .ref(`/latest-position`)
      .on('value', snap => {
        const [position] = JSON.parse(snap.val())
        setPosition(position.coords)
      })
  }, [])

  if (!position) {
    return null
  }

  console.log(position)

  return (
    <Map center={toLeafLetPos(position)} zoom={18}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Circle center={toLeafLetPos(position)} radius={5} />
    </Map>
  )
}

export default App
