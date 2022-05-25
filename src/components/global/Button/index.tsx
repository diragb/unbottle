// Packages:
import {
  Component,
  Show,
  JSX
} from 'solid-js'


// Styles:
import {
  Wrapper,
  NotificationBubble
} from './styles'


// Functions:
const Button: Component<{
  text: string
  isDisabled?: boolean
  backgroundColor?: string
  hoverBackgroundColor?: string
  activeBackgroundColor?: string
  notificationCount?: string | number
  style?: string | JSX.CSSProperties
  onClick?: () => void
}> = props => {
  return (
    <Wrapper
      isDisabled={ props.isDisabled ?? false }
      backgroundColor={ props.backgroundColor }
      hoverBackgroundColor={ props.hoverBackgroundColor }
      activeBackgroundColor={ props.activeBackgroundColor }
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
