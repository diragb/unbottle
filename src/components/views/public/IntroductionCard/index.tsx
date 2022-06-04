// Packages:
import { Component } from 'solid-js'
import { styled } from 'solid-styled-components'


// Typescript:
import { THEME } from '../../../../styles/theme'


// Constants:
import COLORS from '../../../../styles/color'


// Styles:
import { blurBackground } from '../../../../styles/animations'
import Button from '../../../global/Button'
import Color from 'color'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
  animation: ${ blurBackground(1) } 1s ease;
`

const Card = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 75vw;
  max-width: 30rem;
  padding: 1.5rem 2rem;
  font-family: 'Inter', 'Nunito Sans', sans-serif;
  border-radius: 0.5rem;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: 800;
`

const Description = styled.div`
  margin-top: 0.5rem;
  font-size: 1.25rem;
`

// Functions:
const IntroductionCard: Component<{
  theme: THEME
  onClick: () => Promise<void>
}> = (props) => {
  return (
    <Wrapper>
      <Card style={{
        'background-color': COLORS.LIGHT,
        'color': COLORS.DARK
      }}>
        <Title>hey there! 👋</Title>
        <Description>
          thanks for checking out unbottle! ❤️
          <br />
          <br />
          unbottle helps you, quite literally, unbottle your feelings
          <br />
          <br />
          no matter what you are going through, there will always be someone out here who will listen to you
          <br />
          <br />
          your diary entries are shared <b>anonymously</b> with people around the world – but only beyond a certain distance – a distance that <b>you get to choose</b>
          <br />
          <br />
          plus, you get to read entries and follow others who unbottle their feelings
          <br />
          <br />
          so, are you ready to get started?
          <Button
            text='get started! 🎉'
            theme={ props.theme }
            shouldAnimate={ false }
            style={{
              'width': '5rem',
              'margin': 0,
              'margin-top': '0.75rem',
              'padding': '0.75rem 1rem',
              'background-color': COLORS.BLUE,
              'color': COLORS.LIGHT,
            }}
            onClick={ props.onClick }
          />
          <div
            style={{
              'margin-top': '1rem',
              'font-size': '0.75rem'
            }}
          >
            we need your location access to hide your diary entries up until a distance
          </div>
        </Description>
      </Card>
    </Wrapper>
  )
}


// Exports:
export default IntroductionCard
