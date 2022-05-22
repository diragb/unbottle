// Packages:
import { Component, createSignal, createEffect, Show, onMount } from 'solid-js'
import { styled } from 'solid-styled-components'


// Typescript:
import { ILayoutProps } from '../../global/Layout/types'


// Constants:
import ROUTES from '../../../routes'


// Components:
import Layout from '../../global/Layout'
import GoBack from '../../../components/global/GoBack'
import EntryBlob from '../../../components/views/Diary/EntryBlob'


// Styles:
const Wrapper = styled.div`
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
  }
`

const Entries = styled.div`
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


// Components:
const Diary: Component = () => {
  // Return:
  return (
    <Layout>
      {
        (layoutProps: ILayoutProps) => (
          <Wrapper style={{ animation: layoutProps.wrapperAnimation() }}>
            <GoBack goBack={ () => layoutProps.goBack(ROUTES.AUTH.HOME) } />
            <Entries>
              <EntryBlob
                title='a day full of epiphanies'
                time='21st May, 2022 9:34 PM'
                body={ `Well damn. Your words were definitely read by at least me. I'm 19, so I couldn't personally relate to a lot of your experiences, but some of those experiences are instead fears I have for the future. I chose my major based on the same parameters as you and now I just don't know if I'll be happy with just..` }
                hearts={ 0 }
                comments={ 0 }
                navigate={
                  () => layoutProps.goToRoute({
                    route: `${ ROUTES.AUTH.READ }/${ 'wfa35vg4' }`
                  })
                }
              />
              <EntryBlob
                title='a day full of epiphanies'
                time='21st May, 2022 9:34 PM'
                body={ `Well damn. Your words were definitely read by at least me. I'm 19, so I couldn't personally relate to a lot of your experiences, but some of those experiences are instead fears I have for the future. I chose my major based on the same parameters as you and now I just don't know if I'll be happy with just..` }
                hearts={ 0 }
                comments={ 0 }
                navigate={
                  () => layoutProps.goToRoute({
                    route: `${ ROUTES.AUTH.READ }/${ 'wfa35vg4' }`
                  })
                }
              />
              <EntryBlob
                title='a day full of epiphanies'
                time='21st May, 2022 9:34 PM'
                body={ `Well damn. Your words were definitely read by at least me. I'm 19, so I couldn't personally relate to a lot of your experiences, but some of those experiences are instead fears I have for the future. I chose my major based on the same parameters as you and now I just don't know if I'll be happy with just..` }
                hearts={ 0 }
                comments={ 0 }
                navigate={
                  () => layoutProps.goToRoute({
                    route: `${ ROUTES.AUTH.READ }/${ 'wfa35vg4' }`
                  })
                }
              />
              <EntryBlob
                title='a day full of epiphanies'
                time='21st May, 2022 9:34 PM'
                body={ `Well damn. Your words were definitely read by at least me. I'm 19, so I couldn't personally relate to a lot of your experiences, but some of those experiences are instead fears I have for the future. I chose my major based on the same parameters as you and now I just don't know if I'll be happy with just..` }
                hearts={ 0 }
                comments={ 0 }
                navigate={
                  () => layoutProps.goToRoute({
                    route: `${ ROUTES.AUTH.READ }/${ 'wfa35vg4' }`
                  })
                }
              />
              <EntryBlob
                title='a day full of epiphanies'
                time='21st May, 2022 9:34 PM'
                body={ `Well damn. Your words were definitely read by at least me. I'm 19, so I couldn't personally relate to a lot of your experiences, but some of those experiences are instead fears I have for the future. I chose my major based on the same parameters as you and now I just don't know if I'll be happy with just..` }
                hearts={ 0 }
                comments={ 0 }
                navigate={
                  () => layoutProps.goToRoute({
                    route: `${ ROUTES.AUTH.READ }/${ 'wfa35vg4' }`
                  })
                }
              />
              <EntryBlob
                title='a day full of epiphanies'
                time='21st May, 2022 9:34 PM'
                body={ `Well damn. Your words were definitely read by at least me. I'm 19, so I couldn't personally relate to a lot of your experiences, but some of those experiences are instead fears I have for the future. I chose my major based on the same parameters as you and now I just don't know if I'll be happy with just..` }
                hearts={ 0 }
                comments={ 0 }
                navigate={
                  () => layoutProps.goToRoute({
                    route: `${ ROUTES.AUTH.READ }/${ 'wfa35vg4' }`
                  })
                }
              />
              <EntryBlob
                title='a day full of epiphanies'
                time='21st May, 2022 9:34 PM'
                body={ `Well damn. Your words were definitely read by at least me. I'm 19, so I couldn't personally relate to a lot of your experiences, but some of those experiences are instead fears I have for the future. I chose my major based on the same parameters as you and now I just don't know if I'll be happy with just..` }
                hearts={ 0 }
                comments={ 0 }
                navigate={
                  () => layoutProps.goToRoute({
                    route: `${ ROUTES.AUTH.READ }/${ 'wfa35vg4' }`
                  })
                }
              />
            </Entries>
          </Wrapper>
        )
      }
    </Layout>
  )
}


// Exports:
export default Diary
