// Packages:
import {
  Component,
  createSignal,
  createEffect,
  Show,
  onMount
} from 'solid-js'
import { useRouteData } from 'solid-app-router'
import { nanoid } from 'nanoid'
import Sentiment from 'sentiment'
import createLocalStore from '../../../utils/createLocalStore'


// Typescript:
import { IEntry, IMetadata } from '../../../ts/state'
import { ILayoutProps, TGoToRoute } from '../../global/Layout/types'


// Constants:
import { MAX_DISTANCE } from '../../../constants/geo'
import ROUTES from '../../../routes'


// Components:
import Layout from '../../global/Layout'
import GoBack from '../../../components/global/GoBack'
import MoodPicker, { IMood } from '../../../components/global/MoodPicker'
import Button from '../../../components/global/Button'


// Styles:
import {
  Wrapper,
  Section,
  Title,
  Input,
  Editor,
  Distance,
  DistanceField,
  Buttons
} from './styles'
import { dequadrantizeRange, getLatitudeRange, getLongitudeRange, linearRange } from '../../../utils/geo'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { DATABASE } from '../../../firebase'


// Functions:
const Write: Component = () => {
  // Constants:
  const DEFAULT_ENTRY: IEntry = {
    id: '',
    stage: 0,
    mood: undefined,
    title: '',
		body: '',
    distance: '100',
    sentiment: 0,
    range: { min: 0, max: 0 }
  }
  const metadata: IMetadata = useRouteData()
  const sentiment = new Sentiment()

  // Signals:
  const [ entry, setEntry ] = createLocalStore<IEntry>('entry', DEFAULT_ENTRY)
  const [ stage, setStage ] = createSignal(entry.stage)
  const [ vignetteColor, setVignetteColor ] = createSignal('#FFFFFF')
  const [ isVignetteActive, setIsVignetteActive ] = createSignal(false)
  const [ selectedMood, setSelectedMood ] = createSignal<IMood | undefined>(entry.mood)
  const [ title, setTitle ] = createSignal(entry.title)
  const [ body, setBody ] = createSignal(entry.body)
  const [ distance, setDistance ] = createSignal(entry.distance)


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
    setVignetteColor('#FFFFFF')
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
    const userEntriesRef = doc(DATABASE.FIRESTORE, 'users', 'diragb', 'entries', entry.id)
    await setDoc(userEntriesRef, {
      id: entry.id,
      title: entry.title.substring(0, 500),
      body: entry.body.substring(0, 50),
      time: Timestamp.now()
    })
    const entriesRef = doc(DATABASE.FIRESTORE, 'entries', entry.id) 
    await setDoc(entriesRef, {
      id: entry.id,
      mood: entry.mood,
      title: entry.title.substring(0, 500),
      body: entry.body.substring(0, 10000),
      distance: entry.distance,
      sentiment: entry.sentiment,
      range: entry.range,
      time: Timestamp.now()
    })
  }

  const handlePublish = async (goToRoute: TGoToRoute) => {
    if (
      stage() < 3 ||
      !selectedMood() ||
      title().trim().length === 0 ||
      body().trim().length === 0
    ) return
    setEntry({
      id: nanoid(),
      sentiment: sentiment.analyze(body()).score
    })
    setEntry({
      range: linearRange(dequadrantizeRange({
        lat: getLatitudeRange(
          metadata.position.latitude,
          parseInt(distance())
        ),
        long: getLongitudeRange(
          metadata.position.latitude,
          metadata.position.longitude,
          parseInt(distance())
        )
      }))
    })
    await publishToDatabase()
    clearAllFields()
    setEntry({
      id: '',
      sentiment: 0,
      range: { min: 0, max: 0 },
    })
  }

  // Effects:
  onMount(() => {
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
                    background: title().trim().length === 0 ? '#FFEEEE' : '#ECECEC'
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
                  background: body().trim().length === 0 ? '#FFEEEE' : '#ECECEC'
                }}
                onKeyUp={ e => setBody(e.currentTarget.value) }
              />
            </Show>
            <Show when={ stage() > 2 }>
              <Distance>only people living <DistanceField
                type='text'
                value={ distance() }
                onInput={ e => setDistance(e.currentTarget.value) }
              /> km away from you can see this entry</Distance>
              <Buttons>
                <Button
                  text='save and publish anonymously'
                  style={{ width: 'fit-content', 'margin-left': '0' }}
                  onClick={ () => handlePublish(layoutProps.goToRoute) }
                />
                <Button
                  text='reset all fields'
                  backgroundColor={ '#ECECEC' }
                  style={{ width: 'fit-content', 'min-width': '1rem', 'margin-left': '0' }}
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
