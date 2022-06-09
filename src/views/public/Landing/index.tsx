// Packages:
import {
  Component,
  onMount,
  Show
} from 'solid-js'
import { styled } from 'solid-styled-components'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
} from 'firebase/auth'
import {
  useLocation,
  useNavigate,
  useRouteData
} from 'solid-app-router'
import { get, ref } from 'firebase/database'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { getCoarseLocation } from '../../../utils/geo'


// Typescript:
import { IMetadata, IPosition } from '../../../ts/state'
import { SetStoreFunction } from 'solid-js/store'
import { ILayoutProps } from '../../global/Layout/types'


// Constants:
import ROUTES from '../../../routes'
import { DATABASE } from '../../../firebase'


// Components:
import Layout from '../../global/Layout'
import IntroductionCard from '../../../components/views/public/IntroductionCard'
import Error from '../../../components/global/Error'


// Styles:
const Wrapper = styled.div`
  position: absolute;
  top: 0; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`


// Functions:
const Landing: Component = () => {
  // Constants:
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const analytics = getAnalytics()
  const { metadata, setMetadata }: {
    metadata: Readonly<IMetadata>,
    setMetadata: SetStoreFunction<IMetadata>
  } = useRouteData()
  const location = useLocation<{ signInFailed: boolean }>()
  const navigate = useNavigate()

  // Functions:
  const signIn = async () => {
    setMetadata({
      isSigningIn: true
    })
    await signInWithRedirect(auth, provider)
  }

  // Effects:
  onMount(async () => {
    if (metadata.isSigningIn) {
      try {
        const user = (await getRedirectResult(auth))?.user
        const signInFailed = user === undefined
        if (
          (await get(ref(DATABASE.REALTIME, `users/${ user?.displayName ?? auth.currentUser?.displayName }`))).exists()
        ) navigate(ROUTES.AUTH.HOME, { state: { prev: ROUTES.PUBLIC.LANDING } })
        else navigate(ROUTES.PUBLIC.SETUP, { state: { prev: location.pathname, signInFailed } })
      } catch(e) {
        console.error(e)
      }
    }
    onAuthStateChanged(auth, user => {
      if (user && !metadata.isSignedIn) setMetadata({
        isSignedIn: true
      })
      else if (!user && metadata.isSignedIn) setMetadata({
        isSignedIn: false
      })
    })
  })

  // Return:
  return (
    <Layout>
      {
        (layoutProps: ILayoutProps) => (
          <Wrapper
            style={{ animation: layoutProps.wrapperAnimation() }}
          >
            <Show when={ !metadata.didShowIntroductionCard }>
              <IntroductionCard
                theme={ metadata.theme }
                onClick={
                  async () => {
                    setMetadata({
                      position: await getCoarseLocation(),
                      didShowIntroductionCard: true
                    })
                  }
                }
              />
            </Show>
            <Error
              errorText='thanks for checking me out 🥺'
              errorDescription={ <>unbottle will be in its beta phase till july 31st, 2022<br />please follow me at <a href='https://instagram.com/unbottle.app' target='_blank' onClick={ () => logEvent(analytics, 'landing_username_click') }>@unbottle.app</a> on instagram ❤️</> }
              action={{
                do: (
                  metadata.isSigningIn ?
                  () => {} :
                  (
                    !metadata.isSignedIn ?
                    signIn :
                    () => layoutProps.goToRoute({ route: ROUTES.AUTH.HOME })
                  )
                ),
                text: (
                  metadata.isSigningIn ?
                  'verifying login..' :
                  (
                    !metadata.isSignedIn ?
                    'sign in?' :
                    'go to app'
                  )
                )
              }}
              theme={ metadata.theme }
              isActionDisabled={ metadata.isSigningIn }
            />
            <Show when={ location.state?.signInFailed }>
              <Error
                errorText='sign in failed 🫤'
                errorDescription={ `i'm not sure what the issue is, please check the console log? 🥺` }
                theme={ metadata.theme }
              />
            </Show>
          </Wrapper>
        )
      }
    </Layout>
    
  )
}


// Exports:
export default Landing
