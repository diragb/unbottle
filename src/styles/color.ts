// Typescript:
import { THEME } from './theme'


// Constants:
const COLORS: Readonly<{
  [ key in THEME ]: string
}> = Object.freeze({
  LIGHT: '#FFFFFF',
  DARK: '#010101',
  PINK: '#F28482',
  BLUE: '#476C9B',
  YELLOW: '#F6BD60',
  PURPLE: '#75485E',
  GREEN: '#C3E991'
})


// Exports:
export default COLORS