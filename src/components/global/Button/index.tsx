// Packages:
import {
  Component,
  Show,
  JSX
} from 'solid-js'


// Typescript:
import { THEME } from '../../../styles/theme'


// Styles:
import {
  Wrapper,
  NotificationBubble
} from './styles'


// Functions:
const Button: Component<{
  text: string
  theme: THEME 
  isDisabled?: boolean
  shouldAnimate?: boolean
  notificationCount?: string | number
  style?: string | JSX.CSSProperties
  onClick?: () => void
}> = props => {
  return (
    <Wrapper
      isDisabled={ props.isDisabled ?? false }
      shouldAnimate={ props.shouldAnimate ?? true }
      currentTheme={ props.theme }
      style={ props.style }
      onClick={ props.isDisabled ? () => {} : props.onClick }
    >
      <Show when={ props.notificationCount }>
        <NotificationBubble>{ props.notificationCount }</NotificationBubble>
      </Show>
      { props.text }
    </Wrapper>
  )
}


// Exports:
export default Button
