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
import { useNavigate } from 'solid-app-router'


// Typescript:
import { ILayoutProps } from '../../global/Layout/types'
import { IPreviewEntry } from '../../../ts/state'


// Constants:
import ROUTES from '../../../routes'


// Components:
import Layout from '../../global/Layout'
import GoBack from '../../../components/global/GoBack'
import EntryBlob from '../../../components/views/Diary/EntryBlob'
import Error from '../../../components/global/Error'


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

  // Signals:
  const [ entries, setEntries ] = createSignal<IPreviewEntry[]>([])
  const [ noEntries, setNoEntries ] = createSignal(false)

  // Effects:
  onMount(async () => {
    if (!auth.currentUser) navigate(ROUTES.PUBLIC.LANDING)
    const fetchedEntries = await getUserDiary()
    setEntries(fetchedEntries)
    setNoEntries(fetchedEntries.length === 0)
  })

  // Return:
  return (
    <Layout>
      {
        (layoutProps: ILayoutProps) => (
          <Wrapper style={{ animation: layoutProps.wrapperAnimation() }}>
            <GoBack goBack={ () => layoutProps.goBack(ROUTES.AUTH.HOME) } style={{ position: noEntries() ? 'absolute' : 'initial', 'z-index': 1 }} />
            <Switch>
              <Match when={ noEntries() }>
                <ErrorSection>
                  <Error
                    errorText='no diary entries found 🫤'
                    errorDescription='write an entry? how did your day go? 😅'
                    action={{
                      text: 'write an entry',
                      do: () => layoutProps.goToRoute({ route: ROUTES.AUTH.WRITE, state: { prev: ROUTES.AUTH.DIARY } })
                    }}
                  />
                </ErrorSection>
              </Match>
              <Match when={ entries().length > 0 }>
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
