// Packages:
import { Component, onMount } from 'solid-js'
import { styled } from 'solid-styled-components'
import createLocalStore from './utils/createLocalStore'
import { Routes, Route } from 'solid-app-router'
import { updateFirestoreUser } from './firebase/utils'
import { Timestamp } from 'firebase/firestore'


// Typescript:
import { THEME } from './styles/theme'
import {
  IMetadata,
  IPosition,
  IUser
} from './ts/state'


// Constants:
import ROUTES from './routes'


// Components:
import TopBar from './components/global/TopBar'
import Auth from './views/auth'
import Public from './views/public'


// Styles:
const Wrapper = styled.div``


// Functions:
const App: Component = () => {
  // Signals:
  const [ metadata, setMetadata ] = createLocalStore<IMetadata>('metadata', {
    theme: THEME.LIGHT,
    isSigningIn: false,
    isSignedIn: false,
    position: {
      lat: 0,
      long: 0
    },
    entriesRead: []
	})

  // Effects:
  onMount(async () => {
    const position: IPosition = await new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(p => resolve({
        lat: p.coords.latitude,
        long: p.coords.longitude
      }), () => resolve({
        lat: 0,
        long: 0
      }))
    })
    const userUpdateObject: Partial<IUser> = {
      lastSeen: Timestamp.now()
    }
    if (
      metadata.position.lat !== position.lat ||
      metadata.position.long !== position.long
    ) {
      setMetadata({
        position
      })
      userUpdateObject.position = position
    }
    await updateFirestoreUser(userUpdateObject)
  })

  // Return:
  return (
    <Wrapper>
      <TopBar />
      <Routes>
        <Route path={ ROUTES.PUBLIC.LANDING } element={ <Public.Landing /> } data={ () => ({ metadata, setMetadata }) } />
        <Route path={ ROUTES.PUBLIC.SETUP } element={ <Public.Setup /> } data={ () => ({ metadata, setMetadata }) } />
        <Route path={ ROUTES.AUTH.DIARY } element={ <Auth.Diary /> } />
        <Route path={ ROUTES.AUTH.HOME } element={ <Auth.Home /> } />
        <Route path={ ROUTES.AUTH.READ } element={ <Auth.Read /> } data={ () => ({ metadata, setMetadata }) } />
        <Route path={ `${ ROUTES.AUTH.READ }/:id` } element={ <Auth.Read /> } data={ () => ({ metadata, setMetadata }) } />
        <Route path={ ROUTES.AUTH.WRITE } element={ <Auth.Write /> } data={ () => metadata } />
      </Routes>
    </Wrapper>
  )
}


// Exports:
export default App
