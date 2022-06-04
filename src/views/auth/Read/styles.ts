// Packages:
import { styled } from 'solid-styled-components'


// Styles:
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 10rem);
  min-height: calc(100vh - 8rem);
  padding: 4rem;
  transition: all 1s ease;

  @media screen and (min-width: 470px) and (max-width: 911px) {
    width: calc(100vw - 8rem);
  }

  @media screen and (max-width: 470px) {
    width: calc(100vw - 4rem);
    padding: 2rem;
    padding-top: 4rem;
  }
`

export const GoBackWrapper = styled.div`
  @media screen and (min-width: 769px) {
    position: sticky;
    top: 4rem;
    z-index: 1;
  }
`

export const ErrorSection = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  width: inherit;
  height: 100vh;
`

export const LoadMore = styled.div``
