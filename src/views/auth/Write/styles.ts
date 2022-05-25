// Packages:
import { styled } from 'solid-styled-components'


// Styles:
import { fadeIn } from '../../../styles/animations'


// Exports:
export const Wrapper = styled.div<{
  isVignetteActive: boolean
  vignetteColor: string
}>`
  width: calc(100vw - 8rem);
  height: calc(100vh - 8rem);
  padding: 4rem;
  box-shadow: inset 0 0 ${ props => props.isVignetteActive ? '150px' : 0 } -50px ${ props => props.vignetteColor };
  transition: all 1s ease;

  @media screen and (max-width: 768px) {
    width: calc(100vw - 3rem);
    height: calc(100vh - 3rem);
    padding: 1.5rem;
    padding-top: 4rem;
  }
`

export const Section = styled.div`
  margin: 3rem 0;
`

export const Title = styled.div`
  width: fit-content;
  font-weight: 700;
  font-size: 1.5rem;
  animation: ${ fadeIn(2) } 0.5s ease;
  user-select: none;

  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
  }
`

export const Editor = styled.textarea`
  min-width: 75vw;
  min-height: 20rem;
  margin-top: 0.5rem;
  padding: 1rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  outline: none;
  resize: none;
  animation: ${ fadeIn(2.5) } 0.5s ease;
  transition: all 0.25s ease;

  &::placeholder {
    color: #696969;
    font-weight: 300;
    font-style: italic;
  }

  @media screen and (max-width: 768px) {
    min-width: calc(100vw - 5rem);
  }
`

export const Distance = styled.div`
  font-size: 1rem;
  animation: ${ fadeIn(2) } 0.5s ease;
`

export const DistanceField = styled.input`
  width: 2.5rem;
  margin: 0;
  padding: 0.1rem 0.25rem;
  padding-top: 0.2rem;
  color: #746153;
  font-weight: 700;
  text-align: center;
  background-color: #FAE3E3;
  border: none;
  border-radius: 5px;
  outline: none;
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    padding-bottom: 2rem;
  }
`
