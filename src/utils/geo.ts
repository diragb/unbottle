// Constants:
import { DEGREE_METRIC_EQUIVALENT } from '../constants/geo'


// Exports:
export const getLatitudeRange = (metric: number, distance: number): { min: number, max: number } => {
  const degrees = distance / DEGREE_METRIC_EQUIVALENT
  let [ min, max ] = [ metric - degrees, metric + degrees ]
  let isMinOverflow = false
  if (min < -90) {
    min = -90
    max += degrees
    isMinOverflow = true
  } if (max > 90) {
    max = 90
    if (!isMinOverflow) min -= degrees
  }
  return { min: Math.max(min, -90), max }
}

export const getLongitudeRange = (lat: number, long: number, distance: number): { min: number, max: number }  => {
  const degrees = distance / (DEGREE_METRIC_EQUIVALENT * Math.cos(lat * (Math.PI / 180)))
  let [ min, max ] = [ long - degrees, long + degrees ]
  let isMinOverflow = false
  if (min < -180) {
    min = -180
    max += degrees
    isMinOverflow = true
  } if (max > 180) {
    max = 180
    if (!isMinOverflow) min -= degrees
  }
  return { min: Math.max(min, -180), max }
}

export const dequadrantizeRange = ({ lat, long }: { lat: { max: number, min: number }, long: { max: number, min: number } }) => ({
  lat: {
    max: lat.max + 90,
    min: lat.min + 90
  },
  long: {
    max: long.max + 180,
    min: long.min + 180
  }
})

export const dequadrantizePoint = ({ lat, long }: { lat: number, long: number }) => ({
  lat: lat + 90,
  long: long + 180
})

export const linearRange = ({ lat, long }: { lat: { max: number, min: number }, long: { max: number, min: number } }) => ({
  max: long.max * lat.max,
  min: long.min * lat.min
})
