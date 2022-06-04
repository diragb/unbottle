// Packages:
import Color from 'color'
import {
  Component,
  JSX,
  Show
} from 'solid-js'


// Typescript:
import { THEME } from '../../../styles/theme'


// Constants:
import COLORS from '../../../styles/color'


// Components:
import Button from '../Button'


// Styles:
import {
  Wrapper,
  Title,
  Subtitle
} from './styles'


// Functions:
const Error: Component<{
  errorText: string
  errorDescription?: string | JSX.Element
  action?: {
    text: string
    do: () => any
  }
  isActionDisabled?: boolean
  theme: THEME
  style?: string | JSX.CSSProperties
}> = props => (
  <Wrapper
    style={ props.style }
  >
    <Title>{ props.errorText }</Title>
    <Subtitle style={{
      'color':
        COLORS[ props.theme ] === COLORS.DARK ?
        Color(COLORS.LIGHT).darken(0.5).hex() :
        (
          Color(COLORS[ props.theme ], 'hex').isLight() ?
          Color(COLORS[ props.theme ]).darken(0.5).hex() :
          Color(COLORS[ props.theme ]).lighten(0.75).hex()
        )
    }}>{ props.errorDescription }</Subtitle>
    <Show when={ props.action }>
      <Button
        text={ props.action?.text ?? '' }
        theme={ props.theme }
        isDisabled={ props.isActionDisabled }
        onClick={ props.action?.do }
      />
    </Show>
  </Wrapper>
)


// Exports:
export default Error
