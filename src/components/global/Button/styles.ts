import { styled } from 'solid-styled-components'


// Styles:
import { fadeIn } from '../../../styles/animations'


// Exports:
export const NotificationBubble = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: fit-content;
  min-width: 0.75rem;
  height: 0.75rem;
  padding: 0.25rem;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 0.75rem;
  text-align: center;
  line-height: 0.8rem;
  background-color: #F15156;
  border-radius: 1rem;
  user-select: none;
  transition: all 0.25s ease;
`

export const Wrapper = styled.div<{
  isDisabled: boolean
  backgroundColor?: string
  hoverBackgroundColor?: string
  activeBackgroundColor?: string
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0.75rem;
  padding: 0.75rem 1.5rem;
  min-width: 9rem;
  color: #746153;
  font-weight: 700;
  font-size: 1rem;
  background-color: ${ props => props.isDisabled ? '#ECECEC' : (props.backgroundColor ?? '#F7D4BC') };
  border-radius: 8px;
  animation: ${ fadeIn(2) } 0.5s ease;
  user-select: none;
  cursor: ${ props => props.isDisabled ? 'default' : 'pointer' };
  transition: all 0.25s ease;

  &:hover {
    background-color: ${ props => props.isDisabled ? '#ECECEC' : (props.hoverBackgroundColor ?? '#FCE1CF') };
  }

  &:active {  
    background-color: ${ props => props.isDisabled ? '#ECECEC' : (props.activeBackgroundColor ?? '#F1C7AA') };
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 0;
    flex-direction: column;
  }
`
