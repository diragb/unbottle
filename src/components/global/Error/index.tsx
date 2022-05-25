// Packages:
import {
  Component,
  JSX,
  Show
} from 'solid-js'


// Components:
import Button from '../Button'


// Styles:
import {
  Wrapper,
  Title,
  Subtitle
} from './styles'


// Components:
const Error: Component<{
  errorText: string
  errorDescription?: string | JSX.Element
  action?: {
    text: string
    do: () => any
  }
  style?: string | JSX.CSSProperties
}> = (props) => (
  <Wrapper
    style={ props.style }
  >
    <Title>{ props.errorText }</Title>
    <Subtitle>{ props.errorDescription }</Subtitle>
    <Show when={ props.action }>
      <Button text={ props.action?.text ?? '' } onClick={ props.action?.do } />
    </Show>
  </Wrapper>
)


// Exports:
export default Error
