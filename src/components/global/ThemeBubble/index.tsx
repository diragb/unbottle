// Packages:
import { Component, createEffect, createSignal } from 'solid-js'
import { SetStoreFunction } from 'solid-js/store'
import COLORS from '../../../styles/color'


// Typescript:
import { THEME } from '../../../styles/theme'
import { IMetadata } from '../../../ts/state'


// Styles:
import {
  Wrapper
} from './styles'


// Functions:
const ThemeBubble: Component<{
  theme: THEME
  setMetadata: SetStoreFunction<IMetadata>
}> = (props) => {
  // Constants:
  const colorsArray = Object.entries(COLORS) as [ THEME, string ][]

  // Signals:
  const [ themeIndex, setThemeIndex ] = createSignal(colorsArray.findIndex(entry => entry[0] === props.theme))

  // Functions:
  const setNextTheme = () => {
    props.setMetadata({
      theme: colorsArray[ (themeIndex() + 1) % colorsArray.length ][0] as THEME
    })
    setThemeIndex((themeIndex() + 1) % colorsArray.length)
  }

  // Return:
  return (
    <Wrapper
      style={{ background: colorsArray[ (themeIndex() + 1) % colorsArray.length ][1] }}
      onClick={ setNextTheme }
    />
  )
}


// Exports:
export default ThemeBubble
