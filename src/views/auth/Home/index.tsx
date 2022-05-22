// Packages:
import { Component } from 'solid-js'


// Typescript:
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
  return (
    <Layout>
      {
        (layoutProps: ILayoutProps) => (
          <Wrapper style={{ animation: layoutProps.wrapperAnimation() }}>
            <Title>hey, how was your day?</Title>
            <Buttons>
              <Button text='make a diary entry' onClick={ () => layoutProps.goToRoute({ route: ROUTES.AUTH.WRITE }) } />
              <Button text={ `read others' entries` } notificationCount={ 5 } />
            </Buttons>
            <Button text='check diary' onClick={ () => layoutProps.goToRoute({ route: ROUTES.AUTH.DIARY }) } />
          </Wrapper>
        )
      }
    </Layout>
  )
}


// Exports:
export default Home
