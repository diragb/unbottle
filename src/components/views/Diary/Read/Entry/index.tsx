// Packages:
import {
  Component,
  onMount,
  Show,
} from 'solid-js'
import { firestoreTimeToReadable } from '../../../../../firebase/utils'
import { distanceBetweenTwoPoints } from '../../../../../utils/geo'
//@ts-ignore
import readingTime from 'reading-time/lib/reading-time'
import sanitize from 'sanitize-html'


// Typescript:
import { IEntry, IMetadata } from '../../../../../ts/state'


// Imports:
import {
  BiStopwatch,
  // BiSolidCommentDetail
} from 'solid-icons/bi'
import { IoLocationSharp } from 'solid-icons/io'
// import { AiFillHeart } from 'solid-icons/ai'


// Constants:
import sanitizeHtmlOptions from '../../../../../utils/sanitizeHtmlOptions'


// Styles:
import {
  Wrapper,
  EntrySection,
  Title,
  MetaDetails,
  Time,
  DividerDot,
  ReadingTime,
  Distance,
  Body
} from './styles'


// Functions:
const Entry: Component<{
  isSolo?: boolean
  currentID?: string
  entry: IEntry
  index?: number
  metadata: IMetadata
  setFocusedEntry?: (currentID: string, id: string, index: number) => void
}> = (props) => {
  // Ref:
  let wrapperRef: HTMLDivElement | undefined
  let bodyRef: HTMLDivElement | undefined

  // Effects:
  onMount(() => {
    if (
      props.entry.body && bodyRef
    ) bodyRef.querySelectorAll('a').forEach(a => a.setAttribute('target', '_blank'))
    window.addEventListener('scroll', () => {
      if (
        !wrapperRef ||
        !props.setFocusedEntry ||
        !props.index ||
        !props.currentID
      ) return
      if (
        wrapperRef.getBoundingClientRect().top < (window.innerHeight / 2) &&
        wrapperRef.getBoundingClientRect().top > 0
      ) props.setFocusedEntry(props.currentID, props.entry.id, props.index)
    })
  })

  // Return:
  return (
    <Wrapper
      ref={ wrapperRef }
      isSolo={ props.isSolo ?? false }
    >
      <EntrySection>
        <Title>{ props.entry.title }</Title>
        <MetaDetails>
          <Time>
            { firestoreTimeToReadable(props.entry.time.seconds) }
          </Time>
          <DividerDot>∙</DividerDot>
          <ReadingTime>
            <BiStopwatch size={ 16 } style={{ 'margin-right': '0.25rem' }} />
            { readingTime(props.entry.body).text }
          </ReadingTime>
          <DividerDot>∙</DividerDot>
          <Show when={ props.entry.position }>
            <Distance>
              <IoLocationSharp size={ 16 } style={{ 'margin-right': '0.25rem' }} />
              { distanceBetweenTwoPoints(props.entry.position, props.metadata.position) } km away
            </Distance>
          </Show>
        </MetaDetails>
        <Show when={ props.entry.body.length > 0 }>
          <Body ref={ bodyRef } innerHTML={ sanitize(props.entry.body, sanitizeHtmlOptions) } />
        </Show>
        {/* <Details>
          <Detail style={{ 'margin-right': '1.25rem' }}><AiFillHeart size={ 16 } color="#F15156"/><DetailText>{ currentEntry().hearts ?? 34 }</DetailText></Detail>
          <Detail><BiSolidCommentDetail size={ 16 } color="#6F2DBD"/><DetailText>{ currentEntry().comments ?? 5 }</DetailText></Detail>
        </Details> */}
      </EntrySection>
    </Wrapper>
  )
}


// Exports:
export default Entry
