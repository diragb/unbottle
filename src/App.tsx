// Packages:
import { Component, onMount } from 'solid-js'
import { styled } from 'solid-styled-components'
import createLocalStore from './utils/createLocalStore'
import { doc, updateDoc } from 'firebase/firestore'
import { Routes, Route } from 'solid-app-router'


// Typescript:
import { THEME } from './styles/theme'
import { IMetadata, IPosition } from './ts/state'


// Constants:
import ROUTES from './routes'
import { DATABASE } from './firebase'


// Components:
import TopBar from './components/global/TopBar'
import Auth from './views/auth'


// Styles:
const Wrapper = styled.div``


// Functions:
const App: Component = () => {
  const [ metadata, setMetadata ] = createLocalStore<IMetadata>('metadata', {
    theme: THEME.LIGHT,
    isSignedIn: false,
    position: {
      latitude: 0,
      longitude: 0
    }
	})

  onMount(async () => {
    const position: IPosition = await new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(p => resolve({
        latitude: p.coords.latitude,
        longitude: p.coords.longitude
      }), () => resolve({
        latitude: 0,
        longitude: 0
      }))
    })
    if (
      metadata.position.latitude !== position.latitude ||
      metadata.position.longitude !== position.longitude
    ) {
      setMetadata({
        position
      })
      const userRef = doc(DATABASE.FIRESTORE, 'users', 'diragb')
      // updateDoc(userRef, {
      //   ...position
      // })
    }
  })

  // Return:
  return (
    <Wrapper>
      <TopBar />
      <Routes>
        <Route path={ ROUTES.AUTH.DIARY } element={ <Auth.Diary /> } />
        <Route path={ ROUTES.AUTH.HOME } element={ <Auth.Home /> } />
        <Route path={ ROUTES.AUTH.PUBLISH } element={ <Auth.Publish /> } />
        <Route path={ `${ ROUTES.AUTH.READ }/:id` } element={ <Auth.Read /> } />
        <Route path={ ROUTES.AUTH.WRITE } element={ <Auth.Write /> } data={ () => metadata } />
      </Routes>
    </Wrapper>
  )
}


// Exports:
export default App
