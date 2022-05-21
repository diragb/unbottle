// Packages:
import { Component } from 'solid-js'
import { styled } from 'solid-styled-components'


// Imports:
import { BiSolidChevronLeft } from 'solid-icons/bi'


// Styles:
import { fadeIn } from '../../../styles/animations'

const Wrapper = styled.div`
  width: fit-content;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1rem;
  color: #A5402D;
  user-select: none;
  animation: ${ fadeIn() } 0.5s ease;
  cursor: pointer;
`


// Components:
const GoBack: Component<{
  goBack: () => Promise<void>
}> = (props) => (
  <Wrapper onClick={ props.goBack }><BiSolidChevronLeft size={'0.9rem'} style={{ margin: '0 -0.1rem -0.15rem 0' }} /> go back</Wrapper>
)


// Exports:
export default GoBack
