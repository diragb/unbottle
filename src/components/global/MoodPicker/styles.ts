// Packages:
import { styled } from 'solid-styled-components'


// Styles:
import { fadeIn } from '../../../styles/animations'


// Exports:
export const Wrapper = styled.div<{ wantsInput: boolean }>`
  width: fit-content;
  margin-top: 0.5rem;
  padding: 0.75rem 0.5rem;
  background-color: ${ props => props.wantsInput ? '#FFEEEE' : '#ECECEC' } ;
  border-radius: 8px;
  animation: ${ fadeIn(3) } 0.5s ease;
  transition: all 0.25s ease;
`

export const MoodOption = styled.div<{
  isSelected: boolean
  hoverBackgroundColor: string
}>`
  display: inline-block;
  margin: 0 0.4rem;
  padding: 0.1rem;
  border-radius: 8px;
  background-color: ${ props => props.isSelected ? props.hoverBackgroundColor : 'transparent' };
  filter: ${ props => props.isSelected ? 'opacity(1)' : 'opacity(0.6)' };
  transform: scale(1.25);
  user-select: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    filter: opacity(1);
  }
`
