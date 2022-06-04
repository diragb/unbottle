
// Packages:
import { styled } from 'solid-styled-components'


// Styles:
import { blurBackground } from '../../../../styles/animations'


// Exports:
export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
  animation: ${ blurBackground(1) } 1s ease;
`

export const Card = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 75vw;
  max-width: 30rem;
  padding: 1.5rem 2rem;
  font-family: 'Inter', 'Nunito Sans', sans-serif;
  border-radius: 0.5rem;
`

export const Title = styled.div`
  font-size: 2rem;
  font-weight: 800;
`

export const Description = styled.div`
  margin-top: 0.5rem;
  font-size: 1.25rem;
`
