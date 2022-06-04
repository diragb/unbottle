// Packages:
import {
  Component,
  createSignal,
  createEffect,
  Show,
  onMount
} from 'solid-js'
import { useNavigate, useRouteData } from 'solid-app-router'
import { nanoid } from 'nanoid'
import Sentiment from 'sentiment'
import createLocalStore from '../../../utils/createLocalStore'
import {
  dequadrantizePoint,
  dequadrantizeRange,
  getLatitudeRange,
  getLongitudeRange,
  linearRange
} from '../../../utils/geo'
import {
  doc,
  increment,
  setDoc,
  Timestamp
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import {
  updateFirestoreUser
} from '../../../firebase/utils'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import Color from 'color'


// Typescript:
import {
  IEntry,
  ILocalStorageEntry,
  IMetadata,
  IMood,
  IPreviewEntry
} from '../../../ts/state'
import { ILayoutProps, TGoToRoute } from '../../global/Layout/types'
import { THEME } from '../../../styles/theme'


// Constants:
import { MAX_DISTANCE } from '../../../constants/geo'
import ROUTES from '../../../routes'
import { DATABASE } from '../../../firebase'
import COLORS from '../../../styles/color'


// Components:
import Layout from '../../global/Layout'
import GoBack from '../../../components/global/GoBack'
import MoodPicker from '../../../components/global/MoodPicker'
import Button from '../../../components/global/Button'
import { Input } from '../../../styles/components'


// Styles:
import {
  Wrapper,
  Section,
  Title,
  Editor,
  Distance,
  DistanceField,
  Buttons
} from './styles'


// Functions:
const getFontColor = (condition: boolean, theme: THEME) => (
  COLORS[ theme ] === COLORS.DARK ?
  Color(COLORS.LIGHT).darken(0.25).hex() :
  condition ?
  (
    Color(COLORS[ theme ], 'hex').isLight() ?
    Color(COLORS[ theme ]).darken(0.75).hex() :
    Color(COLORS[ theme ]).lighten(0.75).hex()
  ) :
  (
    Color(COLORS[ theme ], 'hex').isLight() ?
    Color(COLORS[ theme ]).darken(0.75).hex() :
    Color(COLORS[ theme ]).darken(0.5).hex()
  )
)

const getBackground = (condition: boolean, theme: THEME) => (
  condition ?
  COLORS[ theme ] === COLORS.DARK ?
  Color(COLORS.LIGHT).darken(0.9).hex() :
  (
    Color(COLORS[ theme ], 'hex').isLight() ?
    Color(COLORS[ theme ]).darken(0.1).hex() :
    Color(COLORS[ theme ]).darken(0.4).hex()
  ) :
  COLORS[ theme ] === COLORS.DARK ?
  Color(COLORS.LIGHT).darken(0.95).hex() :
  (
    Color(COLORS[ theme ], 'hex').isLight() ?
    Color(COLORS[ theme ]).darken(0.05).hex() :
    Color(COLORS[ theme ]).lighten(0.45).hex()
  )
)

const Write: Component = () => {
  // Constants:
  const auth = getAuth()
  const DEFAULT_ENTRY: ILocalStorageEntry = {
    id: '',
    stage: 0,
    mood: undefined,
    title: '',
		body: '',
    distance: '100',
    sentiment: 0,
    range: { min: 0, max: 0 },
    hearts: 0,
    comments: 0
  }
  const metadata: IMetadata = useRouteData()
  const sentiment = new Sentiment()
  const navigate = useNavigate()

  // Signals:
  const [ entry, setEntry ] = createLocalStore<ILocalStorageEntry>('entry', DEFAULT_ENTRY)
  const [ stage, setStage ] = createSignal(entry.stage)
  const [ vignetteColor, setVignetteColor ] = createSignal(COLORS[ metadata.theme ])
  const [ isVignetteActive, setIsVignetteActive ] = createSignal(false)
  const [ selectedMood, setSelectedMood ] = createSignal<IMood | undefined>(entry.mood)
  const [ title, setTitle ] = createSignal(entry.title)
  const [ body, setBody ] = createSignal(entry.body)
  const [ distance, setDistance ] = createSignal(entry.distance)
  const [ isSubmitting, setIsSubmitting ] = createSignal(false)
  const [ canSubmit, setCanSubmit ] = createSignal(false)

  // Functions:
  const handleMoodSelect = (mood: IMood) => {
    if (selectedMood()?.color === mood.color) setSelectedMood()
    else {
      setSelectedMood(mood)
      if (stage() === 0) setStage(1)
    }
  }

  const handleMoodOnMouseOver = (color: string) => {
    setVignetteColor(color)
    setIsVignetteActive(true)
  }

  const handleMoodOnMouseOut = () => {
    setVignetteColor(COLORS[ metadata.theme ])
    setIsVignetteActive(true)
  }

  const handleDistance = (rawDistance: string) => {
    if (typeof rawDistance !== 'string') return rawDistance 
    const numericDistance = parseInt(rawDistance.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))
    if (rawDistance === '') return '0'
    if (numericDistance > MAX_DISTANCE) return MAX_DISTANCE.toString()
    return numericDistance.toString()
  }

  const clearAllFields = () => {
    setSelectedMood()
    setTitle('')
    setBody('')
    setDistance('100')
  }

  const publishToDatabase = async () => {
    if (!auth.currentUser || !auth.currentUser.uid) return
    const userEntriesRef = doc(DATABASE.FIRESTORE, 'users', auth.currentUser.uid, 'entries', entry.id)
    const previewEntry: IPreviewEntry = {
      id: entry.id,
      title: entry.title.substring(0, 500),
      body: entry.body.substring(0, 150),
      time: Timestamp.now(),
      hearts: 0,
      comments: 0
    }
    const entriesRef = doc(DATABASE.FIRESTORE, 'entries', entry.id)
    const fullEntry: IEntry = {
      id: entry.id,
      mood: entry.mood as IMood,
      title: entry.title.substring(0, 500),
      body: entry.body.substring(0, 10000).replace(/\r?\n|\r/g, '<br />'),
      distance: entry.distance,
      sentiment: entry.sentiment,
      range: entry.range,
      time: Timestamp.now(),
      hearts: 0,
      comments: 0,
      position: metadata.position,
      signature: Base64.stringify(sha256(auth.currentUser.uid))
    }
    await setDoc(userEntriesRef, previewEntry)
    await setDoc(entriesRef, fullEntry)
    await updateFirestoreUser({
      entries: increment(1)
    })
  }

  const handlePublish = async (goToRoute: TGoToRoute) => {
    if (
      stage() < 3 ||
      !selectedMood() ||
      title().trim().length === 0 ||
      body().trim().length === 0
    ) return
    setIsSubmitting(true)
    setEntry({
      id: nanoid(),
      sentiment: sentiment.analyze(body()).score
    })
    setEntry({
      range: linearRange(dequadrantizeRange({
        lat: getLatitudeRange(
          metadata.position.lat,
          parseInt(distance())
        ),
        long: getLongitudeRange(
          metadata.position.lat,
          metadata.position.long,
          parseInt(distance())
        )
      })),
      position: dequadrantizePoint(metadata.position)
    })
    await publishToDatabase()
    setIsSubmitting(false)
    clearAllFields()
    setEntry({
      id: '',
      sentiment: 0,
      range: { min: 0, max: 0 },
    })
    goToRoute({
      route: ROUTES.AUTH.DIARY
    })
  }

  // Effects:
  onMount(() => {
    if (!auth.currentUser) navigate(ROUTES.PUBLIC.LANDING)
    if (entry.stage > 0) if (
      !entry.mood && entry.title === '' && entry.body === '' && entry.distance === '100'
    ) setStage(0)
  })

  createEffect(() => {
    if (title().length > 0 && stage() <= 1) setStage(2)
    if (body().length > 0 && stage() <= 2) setStage(3)
  })

  createEffect(() => {
    if (selectedMood() !== entry.mood) setEntry({ mood: selectedMood() })
    if (title() !== entry.title) setEntry({ title: title() })
    if (body() !== entry.body) setEntry({ body: body() })
    if (distance() !== entry.distance) setEntry({ distance: distance() })
    setEntry({ stage: stage() })
  })

  createEffect(() => {
    if (typeof distance() === 'string') setDistance(handleDistance(distance()))
  })

  createEffect(() => {
    setVignetteColor(COLORS[ metadata.theme ])
  })

  createEffect(() => {
    if (
      stage() < 3 ||
      !selectedMood() ||
      title().trim().length === 0 ||
      body().trim().length === 0
    ) setCanSubmit(true)
    else setCanSubmit(false)
  })
  
  // Return:
  return (
    <Layout>
      {
        (layoutProps: ILayoutProps) => (
          <Wrapper
            isVignetteActive={ isVignetteActive() }
            vignetteColor={ vignetteColor() }
            style={{ animation: layoutProps.wrapperAnimation() }}
          >
            <GoBack goBack={ () => layoutProps.goBack(ROUTES.AUTH.HOME) } />
            <Section>
              <Title>how was your mood today?</Title>
              <MoodPicker
                selectedMood={ selectedMood() }
                theme={ metadata.theme }
                onClick={ handleMoodSelect }
                onMouseOver={ handleMoodOnMouseOver }
                onMouseOut={ handleMoodOnMouseOut }
              />
            </Section>
            <Show when={ stage() > 0 }>
              <Section>
                <Title>how would you best describe today in one line?</Title>
                <Input
                  type='text'
                  placeholder='start typing...'
                  value={ title() }
                  style={{
                    color: getFontColor(title().trim().length === 0, metadata.theme),
                    background: getBackground(title().trim().length === 0, metadata.theme)
                  }}
                  onKeyUp={ e => setTitle(e.currentTarget.value) }
                />
              </Section>
            </Show>
            <Show when={ stage() > 1 }>
              <Title>tell me more about your day..</Title>
              <Editor
                placeholder='there are a lot of things i need to get off of my chest...'
                value={ body() }
                style={{
                  color: getFontColor(body().trim().length === 0, metadata.theme),
                  background: getBackground(body().trim().length === 0, metadata.theme)
                }}
                onKeyUp={ e => setBody(e.currentTarget.value) }
              />
            </Show>
            <Show when={ stage() > 2 }>
              <Distance>only people living <DistanceField
                type='text'
                value={ distance() }
                style={{
                  color: getFontColor(distance().trim().length === 0, metadata.theme),
                  background: getBackground(distance().trim().length === 0, metadata.theme)
                }}
                onInput={ e => setDistance(e.currentTarget.value) }
              /> km away from you can see this entry</Distance>
              <Buttons>
                <Button
                  text={ isSubmitting() ? 'submitting..' : 'save and publish anonymously' }
                  theme={ metadata.theme }
                  isDisabled={ canSubmit() || isSubmitting() }
                  style={{ width: 'fit-content', 'margin-left': '0' }}
                  onClick={ () => handlePublish(layoutProps.goToRoute) }
                />
                <Button
                  text='reset all fields'
                  theme={ metadata.theme }
                  style={{
                    'width': 'fit-content',
                    'min-width': '1rem',
                    'margin-left': '0'
                  }}
                  onClick={ clearAllFields }
                />
              </Buttons>
            </Show>
          </Wrapper>
        )
      }
    </Layout>
  )
}


// Exports:
export default Write
