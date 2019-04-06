import {getDistance} from 'geolib'
import {mean, path, maxBy} from 'ramda'

export const computeDurationForRide = positions => {
  if (positions.length < 2) {
    return 0
  }

  const [first] = positions
  const last = positions[positions.length - 1]

  return (last.timestamp - first.timestamp) / 1000
}

export const computePriceForRide = positions => {
  if (positions.length === 0) {
    return 0
  }

  if (positions.length === 1) {
    return 100
  }

  const totalTimeM = computeDurationForRide(positions) / 60
  return 100 + Math.round(totalTimeM * 15)
}

export const computeDistanceForRide = positions => {
  let total = 0
  let last = null
  for (const next of positions) {
    if (last) {
      total += getDistance(next.coords, last.coords)
    }
    last = next
  }

  return total
}

export const computeMeanSpeedForRide = positions =>
  mean(positions.map(path(['coords', 'speed'])))

export const computePeakSpeedForRide = positions =>
  positions.reduce(maxBy(path(['coords', 'speed']))).coords.speed
