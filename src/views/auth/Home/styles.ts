// Packages:
import { styled } from 'solid-styled-components'


// Styles:
import { fadeIn } from '../../../styles/animations'


// Exports:
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

export const Title = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  animation: ${ fadeIn() } 0.5s ease;
  user-select: none;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: -1rem;

  @media screen and (max-width: 768px) {
    margin-top: 0.25rem;
    margin-bottom: 0rem;
    flex-direction: column;
  }
`
