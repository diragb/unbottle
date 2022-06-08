// Packages:
import {
  Component,
  createResource,
  createSignal,
  For,
  Match,
  onMount,
  Switch
} from 'solid-js'
import {
  useLocation,
  useNavigate,
  useParams,
  useRouteData
} from 'solid-app-router'
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { dequadrantizePoint } from '../../../utils/geo'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'


// Typescript:
import { SetStoreFunction } from 'solid-js/store'
import { IEntry, IMetadata } from '../../../ts/state'
import { ILayoutProps } from '../../global/Layout/types'


// Constants:
import { DATABASE } from '../../../firebase'
import ROUTES from '../../../routes'


// Components:
import Layout from '../../global/Layout'
import GoBack from '../../../components/global/GoBack'
import Error from '../../../components/global/Error'
import Entry from '../../../components/views/auth/Read/Entry'
import { LoadingIcon } from '../../../styles/components'


// Styles:
import {
  Wrapper,
  GoBackWrapper,
  ErrorSection,
  LoadMore
} from './styles'


// Functions:
const Read: Component = () => {
  // Constants:
  const auth = getAuth()
  const location = useLocation()
  const params = useParams()
  const { metadata, setMetadata }: {
    metadata: Readonly<IMetadata>,
    setMetadata: SetStoreFunction<IMetadata>
  } = useRouteData()
  const navigate = useNavigate()

  // Ref:
  let loadMoreRef: HTMLDivElement | undefined
  
  // Signals:
  const [ id ] = createResource(() => params.id)
  const loadNewEntries = (location.state as { loadNewEntries?: boolean })?.loadNewEntries
  const [ isFetching, setIsFetching ] = createSignal(false)
  const [ currentEntry, setCurrentEntry ] = createSignal<IEntry>()
  const [ entries, setEntries ] = createSignal<IEntry[]>([])
  const [ entriesQueryCursor, setEntriesQueryCursor ] = createSignal<{
    greaterThan?: QueryDocumentSnapshot<DocumentData>
    lessThan?: QueryDocumentSnapshot<DocumentData>
  }>({})
  const [ noEntries, setNoEntries ] = createSignal(false)
  const [ noMoreEntries, setNoMoreEntries ] = createSignal(false)

  // Functions:
  const setFocusedEntry = (currentID: string, id: string, index: number) => {
    if (currentID === id || !auth.currentUser) return
    history.pushState({}, '', `${ ROUTES.AUTH.READ }/${ id }`)
    setCurrentEntry(entries()[ index ])
    if (!metadata.entriesRead.includes(id)) setMetadata({
      entriesRead: metadata.entriesRead.concat(id)
    })
  }

  const fetchEntries = async () => {
    if (!auth.currentUser) return
    setIsFetching(true)
    const currentUserSignature = Base64.stringify(sha256(auth.currentUser.uid))
    const fetchedEntries: IEntry[] = []
    const dequadrantizedReaderLocation = dequadrantizePoint(metadata.position)
    const readerMul = dequadrantizedReaderLocation.lat * dequadrantizedReaderLocation.long
    const entriesRef = collection(DATABASE.FIRESTORE, 'entries')
    // const entryQueryConstraints = {
    //   greaterThan: [ where('range.max', '<=', readerMul), limit(5) ],
    //   lessThan: [ where('range.min', '>=', readerMul), limit(5) ]
    // } // TODO: WRT #20 Remove this when there are many entries and entry velocity is also high
    const entryQueryConstraints = {
      greaterThan: [ limit(5) ],
      lessThan: [ limit(5) ]
    }
    if (entriesQueryCursor().greaterThan) entryQueryConstraints.greaterThan.push(startAfter(entriesQueryCursor().greaterThan))
    if (entriesQueryCursor().lessThan) entryQueryConstraints.lessThan.push(startAfter(entriesQueryCursor().lessThan))
    const greaterThanEntries = await getDocs(query(entriesRef, ...entryQueryConstraints.greaterThan))
    const lessThanEntries = await getDocs(query(entriesRef, ...entryQueryConstraints.lessThan))
    const newEntriesQueryCursor: {
      greaterThan?: QueryDocumentSnapshot<DocumentData>
      lessThan?: QueryDocumentSnapshot<DocumentData>
    } = {}
    if (!greaterThanEntries.empty) greaterThanEntries.forEach(entry => {
      newEntriesQueryCursor.greaterThan = entry
      fetchedEntries.push(entry.data() as IEntry)
    })
    if (!lessThanEntries.empty) lessThanEntries.forEach(entry => {
      newEntriesQueryCursor.lessThan = entry
      fetchedEntries.push(entry.data() as IEntry)
    })
    if (fetchedEntries.length > 0) {
      setEntriesQueryCursor(newEntriesQueryCursor)
      fetchedEntries.sort((entryA, entryB) =>  entryB.time.seconds - entryA.time.seconds)
      const filteredFetchedEntries = fetchedEntries
        // .filter(entry => !metadata.entriesRead.includes(entry.id)) // TODO: WRT #15 Remove this when we have enough entries that it starts overloading the user.
        .filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
        .filter(entry => entry.signature !== currentUserSignature)
      const newEntries = entries().concat(filteredFetchedEntries)
      setEntries(newEntries)
      if (newEntries.length === 0) setNoMoreEntries(true)
      else {
        const currentID = entries()[ newEntries.findIndex(entry => entry.id === filteredFetchedEntries[0].id) ].id
        history.pushState({}, '', `${ ROUTES.AUTH.READ }/${ currentID }`)
        if (!metadata.entriesRead.includes(currentID)) setMetadata({
          entriesRead: metadata.entriesRead.concat(currentID)
        })
      }
    } else {
      if (entries().length === 0) setNoEntries(true)
      else setNoMoreEntries(true)
    }
    setIsFetching(false)
  }

  // Effects:
  onMount(async () => {
    if (!auth.currentUser) navigate(ROUTES.PUBLIC.LANDING)
    if (id()) {
      setIsFetching(true)
      const userEntriesRef = doc(DATABASE.FIRESTORE, 'entries', `${ id() }`)
      setCurrentEntry((await getDoc(userEntriesRef)).data() as IEntry)
      setIsFetching(false)
    } else if (loadNewEntries || !id()) {
      await fetchEntries()
      window.addEventListener('scroll', () => {
        if (
          !loadMoreRef ||
          isFetching() ||
          noMoreEntries()
        ) return
        if (window.innerHeight - loadMoreRef.getBoundingClientRect().top > 0) fetchEntries()
      })
    }
  })

  // Return:
  return (
    <Layout>
      {
        (layoutProps: ILayoutProps) => (
          <Wrapper>
            <GoBackWrapper>
              <GoBack goBack={ () => layoutProps.goBack((location.state as { prev?: string })?.prev ?? ROUTES.AUTH.HOME) } />
            </GoBackWrapper>
            <Switch>
              <Match when={ noEntries() }>
                <ErrorSection>
                  <Error
                    errorText='no entries found 😞'
                    errorDescription='maybe write an entry for others to read? 🥺'
                    action={{
                      text: 'write an entry',
                      do: () => layoutProps.goToRoute({ route: ROUTES.AUTH.WRITE, state: { prev: ROUTES.AUTH.READ } })
                    }}
                    theme={ metadata.theme }
                  />
                </ErrorSection>
              </Match>
              <Match when={ entries().length > 0 || !currentEntry() }>
                <For each={ entries() }>
                  {
                    (entry, index) => (
                      <Entry
                        currentID={ currentEntry()?.id ?? entries()[0].id }
                        entry={ entry }
                        index={ index() }
                        metadata={ metadata }
                        setFocusedEntry={ setFocusedEntry }
                      />
                    )
                  }
                </For>
                <LoadMore ref={ loadMoreRef }>
                  <Switch>
                    <Match when={ isFetching() && !noMoreEntries() }>
                      <div style={{ display: 'flex', 'justify-content': 'center', 'align-items': 'center', height: '75vh' }}>
                        <LoadingIcon size={ 64 } />
                      </div>
                    </Match>
                    <Match when={ !isFetching() && noMoreEntries() }>
                      <div style={{ display: 'flex', 'justify-content': 'center', 'align-items': 'center', height: '75vh' }}>
                        <Error
                          errorText='no more entries found 😅'
                          errorDescription='maybe write an entry for others to read? 👉👈'
                          action={{
                            text: 'write an entry',
                            do: () => layoutProps.goToRoute({ route: ROUTES.AUTH.WRITE, state: { prev: ROUTES.AUTH.READ } })
                          }}
                          theme={ metadata.theme }
                        />
                      </div>
                    </Match>
                  </Switch>
                </LoadMore>
              </Match>
              <Match when={ entries().length === 0 && currentEntry() }>
                <Entry
                  isSolo
                  entry={ currentEntry() as IEntry }
                  metadata={ metadata }
                />
              </Match>
            </Switch>
          </Wrapper>
        )
      }
    </Layout>
  )
}


// Exports:
export default Read