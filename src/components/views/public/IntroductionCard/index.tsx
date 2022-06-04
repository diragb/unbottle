// Packages:
import { Component } from 'solid-js'


// Typescript:
import { THEME } from '../../../../styles/theme'


// Constants:
import COLORS from '../../../../styles/color'


// Components:
import Button from '../../../global/Button'


// Styles:
import {
  Wrapper,
  Card,
  Title,
  Description,
  PermissionReason,
  ButtonWrapper
} from './styles'


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
          <ButtonWrapper>
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
          </ButtonWrapper>
          <PermissionReason>
            we need your location access to hide your diary entries up until a distance
          </PermissionReason>
        </Description>
      </Card>
    </Wrapper>
  )
}


// Exports:
export default IntroductionCard
