// Packages:
import { styled } from 'solid-styled-components'


// Styles:
import { fadeIn } from '../../../styles/animations'

export const Wrapper = styled.div`
  position: absolute;
  top: 0; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  @media screen and (max-width: 768px) {
    width: calc(100vw - 3rem);
    height: calc(100vh - 3rem);
    padding: 1.5rem;
    padding-top: 4rem;
  }
`

export const Title = styled.div`
  width: fit-content;
  margin-left: 0.25rem;
  font-weight: 700;
  font-size: 1.25rem;
  animation: ${ fadeIn(2) } 0.5s ease;
  user-select: none;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`

export const InputArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
`

export const ErrorText = styled.div`
  width: fit-content;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
  font-weight: 600;
  font-size: 1rem;
  color: #F15156;
  animation: ${ fadeIn(2) } 0.5s ease;
  user-select: none;

  @media screen and (max-width: 768px) {
    font-size: 0.75rem;
  }
`
