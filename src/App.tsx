// Packages:
import {
  Component,
  createEffect,
  createSignal,
  onMount
} from 'solid-js'
import { createGlobalStyles, styled } from 'solid-styled-components'
import createLocalStore from './utils/createLocalStore'
import { Routes, Route } from 'solid-app-router'
import { updateFirestoreUser } from './firebase/utils'
import { Timestamp } from 'firebase/firestore'
import Color from 'color'
import {
  getCoarseLocation,
  getGeolocationPermissionStatus,
  getPreciseGeolocation
} from './utils/geo'
import isEqual from 'lodash.isequal'


// Typescript:
import { generateFontColor, THEME } from './styles/theme'
import {
  IExtendedPosition,
  IMetadata,
  IPosition,
  IUser
} from './ts/state'


// Constants:
import ROUTES from './routes'
import COLORS from './styles/color'
import { NULL_ISLAND_POSITION } from './constants/geo'


// Components:
import TopBar from './components/global/TopBar'
import Auth from './views/auth'
import Public from './views/public'
import ThemeBubble from './components/global/ThemeBubble'


// Styles:
const GlobalStyle = createGlobalStyles`
  body {
    margin: 0;
    overflow-x: hidden;
    font-family: 'Nunito Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  input {
    font-family:'Nunito Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const Wrapper = styled.div<{
  anchorColor: string
  placeholderColor: string
}>`
  width: 100vw;
  /* height: 100vh; */
  transition: all 0.25s ease;

  a {
    font-weight: 600;
    text-decoration: none;
    color: ${ props => props.anchorColor };
  }

  ::placeholder {
    color: ${ props => props.placeholderColor };
  }
`


// Functions:
const App: Component = () => {
  // Signals:
  const [ metadata, setMetadata ] = createLocalStore<IMetadata>('metadata', {
    theme: THEME.LIGHT,
    isSigningIn: false,
    isSignedIn: false,
    position: {
      ...NULL_ISLAND_POSITION,
      isPrecise: false
    },
    entriesRead: [],
    lastSeen: Timestamp.now(),
    didShowIntroductionCard: false,
    permissions: {
      cookies: true,
      location: false
    }
	})
  const [ fontColor, setFontColor ] = createSignal(generateFontColor(metadata.theme))

  // Effects:
  onMount(async () => {
    const isPrecisePositionAllowed = await getGeolocationPermissionStatus() === 'granted'
    if (metadata.permissions.location !== isPrecisePositionAllowed) setMetadata({
      permissions: {
        ...metadata.permissions,
        location: isPrecisePositionAllowed
      }
    })
    const precisePosition: IPosition | {} = metadata.permissions.location ? await getPreciseGeolocation() : {}
    const position: IExtendedPosition = {
      ...await getCoarseLocation(),
      ...precisePosition,
      isPrecise: !isEqual(precisePosition, {})
    }
    const userUpdateObject: Partial<IUser> = {}
    const currentTimestamp = Timestamp.now()
    if (currentTimestamp.seconds > metadata.lastSeen.seconds + 60) {
      setMetadata({
        lastSeen: currentTimestamp
      })
      userUpdateObject.lastSeen = currentTimestamp
    }
    if (!isEqual(metadata.position, position)) {
      setMetadata({
        position
      })
      userUpdateObject.position = position
    }
    if (
      userUpdateObject &&
      Object.keys(userUpdateObject).length !== 0 &&
      Object.getPrototypeOf(userUpdateObject) === Object.prototype
    ) await updateFirestoreUser(userUpdateObject)
  })

  createEffect(() => {
    setFontColor(generateFontColor(metadata.theme))
  })

  // Return:
  return (
    <>
      <GlobalStyle />
      <Wrapper
        anchorColor={ Color(fontColor()).rotate(30).hex() }
        placeholderColor={ Color(fontColor()).alpha(0.5).toString() }
        style={{
          'background-color': COLORS[ metadata.theme ],
          'color': fontColor(),
        }}
      >
        <TopBar />
        <ThemeBubble
          theme={ metadata.theme }
          setMetadata={ setMetadata }
        />
        <Routes>
          <Route path={ ROUTES.PUBLIC.LANDING } element={ <Public.Landing /> } data={ () => ({ metadata, setMetadata }) } />
          <Route path={ ROUTES.PUBLIC.SETUP } element={ <Public.Setup /> } data={ () => ({ metadata, setMetadata }) } />
          <Route path={ ROUTES.AUTH.DIARY } element={ <Auth.Diary /> } data={ () => metadata } />
          <Route path={ ROUTES.AUTH.HOME } element={ <Auth.Home /> } data={ () => metadata } />
          <Route path={ ROUTES.AUTH.READ } element={ <Auth.Read /> } data={ () => ({ metadata, setMetadata }) } />
          <Route path={ `${ ROUTES.AUTH.READ }/:id` } element={ <Auth.Read /> } data={ () => ({ metadata, setMetadata }) } />
          <Route path={ ROUTES.AUTH.WRITE } element={ <Auth.Write /> } data={ () => metadata } />
        </Routes>
      </Wrapper>
    </>
  )
}


// Exports:
export default App
