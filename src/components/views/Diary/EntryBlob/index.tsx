// Packages:
import { Component } from 'solid-js'
import { styled } from 'solid-styled-components'


// Imports:
import { AiFillHeart } from 'solid-icons/ai'
import { BiSolidCommentDetail } from 'solid-icons/bi'


// Typescript:
export interface IEntryBlobProps {
  title: string
  time: string
  body: string
  hearts: number
  comments: number
  navigate: () => void
}


// Styles:
import { fadeIn } from '../../../../styles/animations'

const Wrapper = styled.div`
  width: calc(21.5rem - 3.5rem);
  max-height: calc(21.5rem - 3.5rem);
  margin: 0.7rem;
  padding: 1.75rem 1.5rem;
  background-color: #F3F3F3;
  border-radius: 1.25rem;
  user-select: none;
  animation: ${ fadeIn() } 0.5s ease;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: #FCE1CF;
  }

  @media screen and (max-width: 470px) {
    width: calc(100% - 5rem);
    margin: 1rem;
  }
`

const Title = styled.div`
  display: -webkit-box;
  max-height: 3.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.75rem;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Time = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #6A6A6A;
`

const Body = styled.div`
  display: -webkit-box;
  max-height: 12.375rem;
  margin-top: 0.75rem;
  line-height: 1.375rem;
  text-overflow: ellipsis;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Details = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-top: 0.5rem;
  font-size: 0.75rem;
`

const Detail = styled.div`
  display: flex;
  align-items: center;
`

const DetailText = styled.span`
  margin-left: 0.2rem;
  font-weight: 700;
  font-size: 0.75rem;
`


// Functions:
const EntryBlob: Component<IEntryBlobProps> = (props) => {
  return (
    <Wrapper onClick={ props.navigate }>
      <Title>{ props.title }</Title>
      <Time>{ props.time }</Time>
      <Body>{ props.body }</Body>
      <Details>
        <Detail style={{ 'margin-right': '0.5rem' }}><AiFillHeart size={ 12 } color="#F15156"/><DetailText>{ props.hearts }</DetailText></Detail>
        <Detail><BiSolidCommentDetail size={ 12 } color="#6F2DBD"/><DetailText>{ props.comments }</DetailText></Detail>
      </Details>
    </Wrapper>
  )
}


// Exports:
export default EntryBlob