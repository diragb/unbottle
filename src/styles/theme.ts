// Packages
import Color from 'color'


// Constants:
import COLORS from './color'


// Exports:
export const enum THEME {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
  PINK = 'PINK',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
  PURPLE = 'PURPLE',
  GREEN = 'GREEN'
}

export const generateFontColor = (theme: THEME) => (
  COLORS[ theme ] === COLORS.DARK ?
  COLORS.LIGHT
  :
  Color(COLORS[ theme ], 'hex').isLight() ?
    Color(COLORS[ theme ]).darken(0.75).hex()
    :
    Color(COLORS[ theme ]).lighten(0.95).hex()
)
