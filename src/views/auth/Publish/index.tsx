// Packages:
import { Component, createSignal, createEffect, Show, onMount } from 'solid-js'
import { styled } from 'solid-styled-components'


// Typescript:
import { ILayoutProps } from '../../global/Layout/types'


// Constants:
import ROUTES from '../../../routes'


// Components:
import Layout from '../../global/Layout'


// Styles:
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  transition: all 1s ease;

  @media screen and (max-width: 768px) {
  }
`


// Components:
const Publish: Component = () => {
  // Return:
  return (
    <Layout>
      {
        (layoutProps: ILayoutProps) => (
          <Wrapper
            style={{ animation: layoutProps.wrapperAnimation() }}
          >
            {/* <GoBack goBack={ () => layoutProps.goBack(ROUTES.AUTH.WRITE) } /> */}
          
          </Wrapper>
        )
      }
    </Layout>
  )
}


// Exports:
export default Publish
