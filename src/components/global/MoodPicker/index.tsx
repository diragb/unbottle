// Packages:
import { Component, For } from 'solid-js'


// Typescript:
export interface IMood {
  icon: string
  name: string
  color: string
}


// Imports:
import {
  Wrapper,
  MoodOption
} from './styles'


// Functions:
const MoodPicker: Component<{
  selectedMood?: IMood
  onClick: (mood: IMood) => any
  onMouseOver: (color: string) => void
  onMouseOut: () => void
}> = (props) => {
  // Constants:
  const MOODS = [
    {
      icon: '😁',
      name: 'elated',
      color: '#32DE8A'
    },
    {
      icon: '😌',
      name: 'content',
      color: '#016FB9'
    },
    {
      icon: '😴',
      name: 'tired',
      color: '#35524A'
    },
    {
      icon: '😫',
      name: 'distressed',
      color: '#E26D5C'
    },
    {
      icon: '😡',
      name: 'irritated',
      color: '#DD1C1A'
    },
  ]

  // Return:
  return (
    <Wrapper wantsInput={ props.selectedMood === undefined }>
      <For each={ MOODS }>
        {
          mood => (
            <MoodOption
              isSelected={ props.selectedMood?.color === mood.color }
              hoverBackgroundColor={ mood.color }
              onClick={ () => props.onClick(mood) }
              onMouseOver={ () => props.onMouseOver(mood.color) }
              onMouseOut={ props.onMouseOut }
            >
              { mood.icon }
            </MoodOption>
          )
        }
      </For>
    </Wrapper>
  )
}


// Exports:
export default MoodPicker
