// Packages:
import {
  Component,
  createSignal,
  onMount,
  For,
  Switch,
  Match
} from 'solid-js'
import { firestoreTimeToReadable, getUserDiary } from '../../../firebase/utils'
import { getAuth } from 'firebase/auth'
import { useNavigate, useRouteData } from 'solid-app-router'


// Typescript:
import { ILayoutProps } from '../../global/Layout/types'
import { IMetadata, IPreviewEntry } from '../../../ts/state'


// Constants:
import ROUTES from '../../../routes'


// Components:
import Layout from '../../global/Layout'
import GoBack from '../../../components/global/GoBack'
import EntryBlob from '../../../components/views/auth/Diary/EntryBlob'
import Error from '../../../components/global/Error'
import { LoadingIcon } from '../../../styles/components'


// Styles:
import {
  Wrapper,
  ErrorSection,
  Entries
} from './styles'


// Components:
const Diary: Component = () => {
  // Constants:
  const auth = getAuth()
  const navigate = useNavigate()
  const metadata: IMetadata = useRouteData()

  // Signals:
  const [ isFetching, setIsFetching ] = createSignal(false)
  const [ entries, setEntries ] = createSignal<IPreviewEntry[]>([])
  const [ noEntries, setNoEntries ] = createSignal(false)

  // Effects:
  onMount(async () => {
    if (!auth.currentUser) navigate(ROUTES.PUBLIC.LANDING)
    setIsFetching(true)
    const fetchedEntries = await getUserDiary()
    setEntries(fetchedEntries)
    setNoEntries(fetchedEntries.length === 0)
    setIsFetching(false)
  })

  // Return:
  return (
    <Layout>
      {
        (layoutProps: ILayoutProps) => (
          <Wrapper style={{ animation: layoutProps.wrapperAnimation() }}>
            <GoBack goBack={ () => layoutProps.goBack(ROUTES.AUTH.HOME) } style={{ position: noEntries() ? 'absolute' : 'initial', 'z-index': 1 }} />
            <Switch>
              <Match when={ isFetching() && !noEntries() }>
                <div style={{ display: 'flex', 'justify-content': 'center', 'align-items': 'center', height: '75vh' }}>
                  <LoadingIcon size={ 64 } />
                </div>
              </Match>
              <Match when={ !isFetching() && noEntries() }>
                <ErrorSection>
                  <Error
                    errorText='no diary entries found 🫤'
                    errorDescription={ `tell me about your day, i'm listening.. 😌` }
                    action={{
                      text: 'write an entry',
                      do: () => layoutProps.goToRoute({ route: ROUTES.AUTH.WRITE, state: { prev: ROUTES.AUTH.DIARY } })
                    }}
                    theme={ metadata.theme }
                  />
                </ErrorSection>
              </Match>
              <Match when={ !isFetching() && entries().length > 0 }>
                <Entries>
                  <For each={ entries() }>
                    {
                      entry => (
                        <EntryBlob
                          title={ entry.title }
                          time={ firestoreTimeToReadable(entry?.time.seconds) }
                          body={ entry.body }
                          hearts={ entry.hearts }
                          comments={ entry.comments }
                          navigate={
                            () => layoutProps.goToRoute({
                              route: `${ ROUTES.AUTH.READ }/${ entry.id }`
                            })
                          }
                          theme={ metadata.theme }
                        />
                      )
                    }
                  </For>
                </Entries>
              </Match>
            </Switch>
          </Wrapper>
        )
      }
    </Layout>
  )
}


// Exports:
export default Diary
