// Packages:
import { styled } from 'solid-styled-components'


// Styles:
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 8rem);
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

export const ErrorSection = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  width: inherit;
  height: 100vh;
`

export const Entries = styled.div`
  display: flex;
  align-content: flex-start;
  flex-flow: row wrap;
  width: calc(100% + 2rem);
  height: 100%;
  margin-left: -1rem;
  transition: all 0.25s ease;

  @media screen and (max-width: 911px) {
    align-content: unset;
    flex-flow: unset;
    align-items: center;
    flex-direction: column;
  }
`
