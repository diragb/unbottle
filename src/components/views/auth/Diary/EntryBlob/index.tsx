// Packages:
import { Component, onMount } from 'solid-js'
import sanitize from 'sanitize-html'


// Typescript:
import { THEME } from '../../../../../styles/theme'


// Imports:
import { AiFillHeart } from 'solid-icons/ai'
import { BiSolidCommentDetail } from 'solid-icons/bi'


// Constants:
import sanitizeHtmlOptions from '../../../../../utils/sanitizeHtmlOptions'


// Styles:
import {
  Wrapper,
  Title,
  Time,
  Body,
  Details,
  Detail,
  DetailText
} from './styles'


// Functions:
const EntryBlob: Component<{
  title: string
  time: string
  body: string
  hearts: number
  comments: number
  navigate: () => void
  theme: THEME
}> = (props) => {
  // Ref:
  let bodyRef: HTMLDivElement | undefined
  
  // Effects:
  onMount(() => {
    if (
      props.body && bodyRef
    ) bodyRef.querySelectorAll('a').forEach(a => a.removeAttribute('href'))
  })
  
  // TODO: Add loading bar here.

  // Return:
  return (
    <Wrapper
      currentTheme={ props.theme }
      onClick={ props.navigate }
    >
      <Title>{ props.title }</Title>
      <Time currentTheme={ props.theme }>{ props.time }</Time>
      <Body ref={ bodyRef } innerHTML={ sanitize(props.body, sanitizeHtmlOptions) } />
      <Details>
        <Detail style={{ 'margin-right': '0.5rem' }}><AiFillHeart size={ 12 } color="#F15156"/><DetailText>{ props.hearts }</DetailText></Detail>
        <Detail><BiSolidCommentDetail size={ 12 } color="#6F2DBD"/><DetailText>{ props.comments }</DetailText></Detail>
      </Details>
    </Wrapper>
  )
}


// Exports:
export default EntryBlob