// Typescript:
import { FieldValue, Timestamp } from 'firebase/firestore'
import { THEME } from '../styles/theme'


// Exports:
export interface IPosition {
  lat: number
  long: number
}

export interface ICountry {
  name: string
  code: string
}

export interface IRegion {
  name: string
  code: string
}

export interface IExtendedPosition extends IPosition {
  country: ICountry
  region: IRegion
  isPrecise: boolean
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
  range: {
    min: number
    max: number
  }
  hearts: number
  comments: number
  time: Timestamp
  position: IPosition
  signature: string
}

export interface ILocalStorageEntry extends Omit<
  IEntry, 'mood' | 'time' | 'position' | 'signature' | 'hearts' | 'comments' | 'views'
> {
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

export interface IPermissions {
  cookies: boolean
  location: boolean
}

export interface IMetadata {
  theme: THEME
  isSigningIn: boolean
  isSignedIn: boolean
  position: IExtendedPosition
  entriesRead: string[]
  lastSeen: Timestamp
  didShowIntroductionCard: boolean
  permissions: IPermissions
}

export interface IUser {
  username: string
  email: string
  position: IExtendedPosition
  lastSeen: Timestamp
  entries: number | FieldValue
}
