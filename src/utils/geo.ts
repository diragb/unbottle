// Constants:
import { DEGREE_METRIC_EQUIVALENT, NULL_ISLAND_COORDS, R } from '../constants/geo'
import { IPosition } from '../ts/state'


// Typescript:
export interface IMinMax { min: number, max: number }

export interface ICoordMinMax { lat: IMinMax, long: IMinMax }

export interface ICoordNumber { lat: number, long: number }


// Exports:
export const getCoarseLocation = async (geolocationPositionError?: GeolocationPositionError): Promise<IPosition> => {
  let IPDetails
  try {
    IPDetails = await (await fetch('https://api.ipstack.com/check?access_key=a6c85f8a76b8a2d507d9452575910488')).json()
    if (IPDetails.success === false) throw new Error(JSON.parse(IPDetails))
    return {
      lat: IPDetails.latitude,
      long: IPDetails.longitude
    }
  } catch (IPStackError) {
    if (geolocationPositionError) console.error('⚠️ Unable to fetch location from Geolocation API', geolocationPositionError)
    console.error('⚠️ Unable to fetch location from IPStack API', IPStackError)
    console.error('⚠️ Response received from IPStack', IPDetails)
    console.error('⚠️ Assuming user is at NULL_ISLAND')
    return NULL_ISLAND_COORDS
  }
}

export const getPreciseGeolocation = async (): Promise<IPosition> => await new Promise(resolve => {
  navigator.geolocation.getCurrentPosition(p => resolve({
    lat: p.coords.latitude,
    long: p.coords.longitude
  }), e => {
    resolve(getCoarseLocation(e))
  })
})

export const getLatitudeRange = (metric: number, distance: number): IMinMax => {
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

export const getLongitudeRange = (lat: number, long: number, distance: number): IMinMax  => {
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

export const dequadrantizeRange = ({ lat, long }: ICoordMinMax) => ({
  lat: {
    max: lat.max + 90,
    min: lat.min + 90
  },
  long: {
    max: long.max + 180,
    min: long.min + 180
  }
})

export const dequadrantizePoint = ({ lat, long }: ICoordNumber) => ({
  lat: lat + 90,
  long: long + 180
})

export const linearRange = ({ lat, long }: ICoordMinMax) => ({
  max: long.max * lat.max,
  min: long.min * lat.min
})

export const distanceBetweenTwoPoints = (a: ICoordNumber, b: ICoordNumber, options?: {
  round?: number
}) => {
  const coords = {
    a: {
      lat: a.lat * Math.PI / 180,
      long: a.long * Math.PI / 180
    },
    b: {
      lat: b.lat * Math.PI / 180,
      long: b.long * Math.PI / 180
    }
  }
  return parseFloat(
    (
      (
        2 * Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(((coords.a.lat - coords.b.lat)) / 2), 2)
            +
            (
              Math.cos(coords.a.lat) *
              Math.cos(coords.b.lat) *
              Math.pow(Math.sin((coords.a.long - coords.b.long) / 2), 2)
            )
          )
        )
      ) * R
    ).toFixed(options?.round ?? 2)
  )
}

// => (
// parseFloat((Math.sqrt(((a.lat - b.lat) ** 2) + ((a.long - b.long) ** 2))).toFixed(options?.round ?? 2))
// )