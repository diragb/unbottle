// Packages:
import { styled } from 'solid-styled-components'


// Styles:
import { fadeIn } from '../../../../../styles/animations'

export const Wrapper = styled.div<{ isSolo: boolean }>`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - ${ props => props.isSolo ? 15.5 : 11 }rem);
  margin-top: 5rem;
  word-break: break-word;
  animation: ${ fadeIn(3) } 0.5s ease;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin-top: 2rem;
  }

  @media screen and (max-width: 768px) {
    margin-top: 0;
  }
`

export const EntrySection = styled.div`
  width: 55%;
  min-width: 50vw;

  @media screen and (max-width: 768px) {
    width: auto;
  }
`

export const Title = styled.div`
  display: -webkit-box;
  font-size: 2rem;
  font-weight: 700;
`

export const MetaDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: #6A6A6A;
  user-select: none;
`

export const MetaDetail = styled.div`
  display: flex;
  align-items: center;
`

export const Time = styled(MetaDetail)``

export const DividerDot = styled.div`
  margin: 0 0.5rem;
`

export const ReadingTime = styled(MetaDetail)`
  transition: all 0.25s ease;
  
  &:hover {
    color: #77AD78;
  }
`

export const Distance = styled(MetaDetail)`
  transition: all 0.25s ease;
  
  &:hover {
    color: #FF715B;
  }
`

export const Body = styled.div`
  margin-top: 1.5rem;
  font-size: 1.25rem;
`

export const Details = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-top: 1rem;
  font-size: 1rem;
  user-select: none;
`

export const Detail = styled.div`
  display: flex;
  align-items: center;
`

export const DetailText = styled.span`
  margin-left: 0.25rem;
  font-weight: 700;
  font-size: 1rem;
`
