// Packages:
import { styled } from 'solid-styled-components'


// Styles:
import { fadeIn } from '../../../styles/animations'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;
  animation: ${ fadeIn() } 0.5s ease;
`

export const Title = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #252D30;
  
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export const Subtitle = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #6E6E6E;

  @media screen and (max-width: 768px) {
    font-size: 0.75rem;
  }
`
