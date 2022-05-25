// Packages:
import { styled } from 'solid-styled-components'


// Styles:
import { fadeIn } from './animations'


// Exports:
export const Input = styled.input`
  min-width: 50vw;
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  outline: none;
  animation: ${ fadeIn(2.5) } 0.5s ease;
  transition: all 0.25s ease;

  &::placeholder {
    color: #696969;
    font-weight: 300;
    font-style: italic;
  }

  @media screen and (max-width: 768px) {
    min-width: calc(100vw - 4.5rem);
  }
`
