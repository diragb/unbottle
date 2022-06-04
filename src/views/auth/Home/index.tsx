// Packages:
import { Component, onMount } from 'solid-js'
import { getAuth } from 'firebase/auth'
import { useNavigate, useRouteData } from 'solid-app-router'


// Typescript:
import { IMetadata } from '../../../ts/state'
import { ILayoutProps } from '../../global/Layout/types'


// Constants:
import ROUTES from '../../../routes'


// Components:
import Layout from '../../global/Layout'
import Button from '../../../components/global/Button'


// Styles:
import {
  Wrapper,
  Title,
  Buttons
} from './styles'


// Functions:
const Home: Component = ()  => {
  // Constants:
  const auth = getAuth()
  const navigate = useNavigate()
  const metadata: IMetadata = useRouteData()

  // Effects:
  onMount(() => {
    if (!auth.currentUser) navigate(ROUTES.PUBLIC.LANDING)
  })

  // Return:
  return (
    <Layout>
      {
        (layoutProps: ILayoutProps) => (
          <Wrapper style={{ animation: layoutProps.wrapperAnimation() }}>
            <Title>hey, how was your day?</Title>
            <Buttons>
              <Button
                theme={ metadata.theme }
                text='make a diary entry'
                onClick={
                  () => layoutProps.goToRoute({
                    route: ROUTES.AUTH.WRITE
                  })
                }
              />
              <Button
                theme={ metadata.theme }
                text={ `read others' entries` }
                notificationCount='5+'
                onClick={
                  () => layoutProps.goToRoute({
                    route: ROUTES.AUTH.READ,
                    state: {
                      loadNewEntries: true
                    }
                  })
                }
              />
            </Buttons>
            <Button
              theme={ metadata.theme }
              text='check diary'
              onClick={
                () => layoutProps.goToRoute({
                  route: ROUTES.AUTH.DIARY
                })
              }
            />
          </Wrapper>
        )
      }
    </Layout>
  )
}


// Exports:
export default Home
