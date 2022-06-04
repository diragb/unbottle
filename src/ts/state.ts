// Typescript:
import { FieldValue, Timestamp } from 'firebase/firestore'
import { THEME } from '../styles/theme'


// Exports:
export interface IPosition {
  lat: number
  long: number
}

export interface IMood {
  icon: string
  name: string
  color: string
}

export interface IEntry {
  id: string
  mood: IMood
  title: string
  body: string
  distance: string
  sentiment: number
  range: { min: number, max: number }
  hearts: number
  comments: number
  time: Timestamp
  position: IPosition
  signature: string
}

export interface ILocalStorageEntry extends Omit<Omit<Omit<Omit<IEntry, 'mood'>, 'time'>, 'position'>, 'signature'> {
  stage: number
  time?: Timestamp
  mood?: IMood
  position?: IPosition
}

export interface IPreviewEntry {
  id: string
  title: string
  body: string
  time: Timestamp
  hearts: number
  comments: number
}

export interface IMetadata {
  theme: THEME
  isSigningIn: boolean
  isSignedIn: boolean
  position: IPosition
  entriesRead: string[]
  lastSeen: Timestamp
}

export interface IUser {
  username: string
  email: string
  position: IPosition
  lastSeen: Timestamp
  entries: number | FieldValue
}
