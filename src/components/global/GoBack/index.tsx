// Packages:
import { Component, JSX } from 'solid-js'
import { styled } from 'solid-styled-components'


// Imports:
import { BiSolidChevronLeft } from 'solid-icons/bi'


// Styles:
import { fadeIn } from '../../../styles/animations'
import Color from 'color'
import COLORS from '../../../styles/color'

const Wrapper = styled.div`
  width: fit-content;
  margin: -0.5rem -0.5rem 0rem -0.5rem;
  padding: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  user-select: none;
  animation: ${ fadeIn() } 0.5s ease;
  cursor: pointer;
`


// Components:
const GoBack: Component<{
  goBack: () => Promise<void>,
  style?: JSX.CSSProperties
}> = (props) => (
  <Wrapper
    onClick={ props.goBack }
    style={ props.style }
  >
    <BiSolidChevronLeft size={'0.9rem'} style={{ margin: '0 -0.1rem -0.15rem 0' }} /> go back
  </Wrapper>
)


// Exports:
export default GoBack
