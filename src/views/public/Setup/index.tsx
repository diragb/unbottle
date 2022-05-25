// Packages:
import {
  Component,
  createSignal,
  onMount
} from 'solid-js'
import {
  useLocation,
  useNavigate,
  useRouteData
} from 'solid-app-router'
import { getAuth, updateProfile } from 'firebase/auth'
import { isUsernameTaken, updateFirestoreUser } from '../../../firebase/utils'
import { get, ref } from 'firebase/database'


// Typescript:
import { IMetadata } from '../../../ts/state'
import { SetStoreFunction } from 'solid-js/store'
import { ILayoutProps, TGoToRoute } from '../../global/Layout/types'


// Constants:
import ROUTES from '../../../routes'
import { DATABASE } from '../../../firebase'


// Components:
import Layout from '../../global/Layout'
import GoBack from '../../../components/global/GoBack'
import Button from '../../../components/global/Button'
import { Input } from '../../../styles/components'


// Styles:
import {
  Wrapper,
  Title,
  ErrorText
} from './styles'


// Functions:
const Setup: Component = () => {
  // Constants:
  const auth = getAuth()
  const { metadata, setMetadata }: {
    metadata: Readonly<IMetadata>,
    setMetadata: SetStoreFunction<IMetadata>
  } = useRouteData()
  const location = useLocation<{ signInFailed: boolean }>()
  const navigate = useNavigate()

  // Signals:
  const [ loading, setLoading ] = createSignal(false)
  const [ username, setUsername ] = createSignal(auth.currentUser?.email?.split('@')[0] ?? '')
  const [ errorText, setErrorText ] = createSignal('')

  // Effects:
  onMount(async () => {
    if (metadata.isSigningIn) setMetadata({
      isSigningIn: false
    })
    if (location.state?.signInFailed || !auth.currentUser) {
      if (metadata.isSignedIn) setMetadata({ isSignedIn: false })
      navigate(ROUTES.PUBLIC.LANDING, { state: { prev: location.pathname, signInFailed: location.state?.signInFailed } })
    } else {
      if (
        (await get(ref(DATABASE.REALTIME, `users/${ auth.currentUser?.displayName }`))).exists()
      ) navigate(ROUTES.AUTH.HOME, { state: { prev: ROUTES.PUBLIC.LANDING } })
      else {
        await updateProfile(auth.currentUser, {
          displayName: username()
        })
      }
    }
  })

  // Functions:
  const handleUserSetup = async (goToRoute: TGoToRoute) => {
    setLoading(true)
    if (!auth.currentUser) return
    if (await isUsernameTaken(username())) setErrorText('username already taken 🫤')
    await updateProfile(auth.currentUser, {
      displayName: username()
    })
    updateFirestoreUser({
      username: username()
    })
    setLoading(false)
    goToRoute({
      route: ROUTES.AUTH.HOME
    })
  }

  // Return:
  return (
    <Layout>
      {
        (layoutProps: ILayoutProps) => (
          <Wrapper
            style={{ animation: layoutProps.wrapperAnimation() }}
          >
            <GoBack goBack={ () => layoutProps.goBack(metadata.isSignedIn ? ROUTES.AUTH.HOME : ROUTES.PUBLIC.LANDING) } style={{ position: 'absolute', top: '4rem', left: '4rem' }} />
            <div>
              <Title>how would you like to be called?</Title>
              <Input
                type='text'
                placeholder='username'
                value={ username() }
                style={{
                  'min-width': '25vw',
                  background: username().trim().length === 0 ? '#FFEEEE' : '#ECECEC'
                }}
                autocomplete='off'
                spellcheck={ false }
                onKeyUp={ e => setUsername(e.currentTarget.value) }
              />
              <ErrorText>{ errorText() }</ErrorText>
              <Button
                text={ loading() ? 'verifying..' : 'next'}
                isDisabled={ username().trim().length === 0 }
                style={{
                  'min-width': '5rem',
                  width: '5rem',
                  'margin-left': 0
                }}
                onClick={ () => handleUserSetup(layoutProps.goToRoute) }
              />
            </div>
          </Wrapper>
        )
      }
    </Layout>
    
  )
}


// Exports:
export default Setup