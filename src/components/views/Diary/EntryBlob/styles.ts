// Packages:
import { styled } from 'solid-styled-components'


// Styles:
import { fadeIn } from '../../../../styles/animations'

export const Wrapper = styled.div`
  width: calc(21.5rem - 3.5rem);
  max-height: calc(21.5rem - 3.5rem);
  margin: 0.7rem;
  padding: 1.75rem 1.5rem;
  background-color: #F3F3F3;
  border-radius: 1.25rem;
  user-select: none;
  cursor: pointer;
  animation: ${ fadeIn() } 0.5s ease;
  transition: all 0.25s ease;

  &:hover {
    background-color: #FCE1CF;
  }

  @media screen and (max-width: 470px) {
    width: calc(100% - 5rem);
    margin: 1rem;
  }
`

export const Title = styled.div`
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

export const Time = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #6A6A6A;
`

export const Body = styled.div`
  display: -webkit-box;
  max-height: 12.375rem;
  margin-top: 0.75rem;
  line-height: 1.375rem;
  text-overflow: ellipsis;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Details = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-top: 0.5rem;
  font-size: 0.75rem;
`

export const Detail = styled.div`
  display: flex;
  align-items: center;
`

export const DetailText = styled.span`
  margin-left: 0.2rem;
  font-weight: 700;
  font-size: 0.75rem;
`
