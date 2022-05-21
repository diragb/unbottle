// Imports:
import { THEME } from '../styles/theme'
import { IMood } from '../components/global/MoodPicker'


// Exports:
export interface IEntry {
  id: string
  stage: number
  mood?: IMood
  title: string
  body: string
  distance: string
  sentiment: number
  range: { min: number, max: number }
}

export interface IPosition {
  longitude: number
  latitude: number
}

export interface IMetadata {
  theme: THEME
  isSignedIn: boolean
  position: IPosition
}
