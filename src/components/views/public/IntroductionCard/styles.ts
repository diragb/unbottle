
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

  @media screen and (max-width: 768px) {
    padding: 1rem 1.25rem;
  }
`

export const Title = styled.div`
  font-size: 2rem;
  font-weight: 800;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export const Description = styled.div`
  margin-top: 0.5rem;
  font-size: 1.25rem;

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`

export const ButtonWrapper = styled.div`
  @media screen and (max-width: 768px) {
    transform: scale(0.75);
    transform-origin: 0 50%;
    -webkit-transform-origin-x: 0;
    -ms-transform-origin: 0 50%;
  }
`

export const PermissionReason = styled.div`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  
  @media screen and (max-width: 768px) {
    margin-top: 0.25rem;
    font-size: 0.65rem;
  }
`
