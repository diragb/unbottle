// Packages:
import { styled } from 'solid-styled-components'
import Color from 'color'


// Typescript:
import { THEME } from '../../../styles/theme'
import { IWrapperProps } from './types'


// Constants:
import COLORS from '../../../styles/color'


// Styles:
import { fadeIn } from '../../../styles/animations'


// Functions:
const getDisabledButtonFontColor = (theme: THEME) => (
  COLORS[ theme ] === COLORS.DARK ?
  Color(COLORS.LIGHT).darken(0.75).hex() :
  (
    Color(COLORS[ theme ], 'hex').isLight() ?
    Color(COLORS[ theme ]).darken(0.5).alpha(0.25).toString() :
    Color(COLORS[ theme ]).darken(0.45).alpha(0.25).toString()
  )
)

const getButtonFontColor = (props: IWrapperProps) => (
  props.isDisabled ?
  getDisabledButtonFontColor(props.currentTheme) :
  (
    COLORS[ props.currentTheme ] === COLORS.DARK ?
    Color(COLORS.LIGHT).darken(0.15).hex() :
    (
      Color(COLORS[ props.currentTheme ], 'hex').isLight() ?
      Color(COLORS[ props.currentTheme ]).darken(0.6).hex() :
      Color(COLORS[ props.currentTheme ]).darken(0.35).hex()
    )
  )
)

const getDisabledButtonBackgroundColor = (theme: THEME) => (
  COLORS[ theme ] === COLORS.DARK ?
  Color(COLORS.LIGHT).darken(0.95).hex() :
  (
    Color(COLORS[ theme ], 'hex').isLight() ?
    Color(COLORS[ theme ]).darken(0.025).hex() :
    Color(COLORS[ theme ]).lighten(0.4).hex()
  )
)

const getButtonBackgroundColor = (props: IWrapperProps) => (
  props.isDisabled ?
  getDisabledButtonBackgroundColor(props.currentTheme) :
  (
    COLORS[ props.currentTheme ] === COLORS.DARK ?
    Color(COLORS.LIGHT).darken(1).hex() :
    (
      Color(COLORS[ props.currentTheme ], 'hex').isLight() ?
      Color(COLORS[ props.currentTheme ]).darken(0.1).hex() :
      Color(COLORS[ props.currentTheme ]).lighten(0.45).hex()
    )
  )
)


// Exports:
export const NotificationBubble = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: fit-content;
  min-width: 0.75rem;
  height: 0.75rem;
  padding: 0.25rem;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 0.75rem;
  text-align: center;
  line-height: 0.8rem;
  background-color: #F15156;
  border-radius: 1rem;
  user-select: none;
  transition: all 0.25s ease;
`

export const Wrapper = styled.div<IWrapperProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0.75rem;
  padding: 0.75rem 1.5rem;
  min-width: 9rem;
  color: ${ props => getButtonFontColor(props) };
  font-weight: 700;
  font-size: 1rem;
  background-color: ${ props => getButtonBackgroundColor(props) };
  border-radius: 8px;
  border: ${ props =>
    COLORS[ props.currentTheme ] === COLORS.DARK ?
    (
      props.isDisabled ?
      getDisabledButtonBackgroundColor(props.currentTheme) :
      `1px solid ${ Color(COLORS.LIGHT).darken(0.25).hex() }`
    ) :
    'unset'
  };
  animation: ${ props => props.shouldAnimate ? `${ fadeIn(2) } 0.5s ease` : '' };
  user-select: none;
  cursor: ${ props => props.isDisabled ? 'default' : 'pointer' };
  transition: all 0.25s ease;

  &:hover {
    color: ${ props =>
      props.isDisabled ?
      getDisabledButtonFontColor(props.currentTheme) :
      (
        COLORS[ props.currentTheme ] === COLORS.DARK ?
        COLORS.DARK :
        (
          Color(COLORS[ props.currentTheme ], 'hex').isLight() ?
          'inherit' :
          getButtonFontColor(props)
        )
      )
    };
    background-color: ${ props =>
      props.isDisabled ?
      getDisabledButtonBackgroundColor(props.currentTheme) :
      (
        COLORS[ props.currentTheme ] === COLORS.DARK ?
        Color(COLORS.LIGHT).hex() :
        (
          Color(COLORS[ props.currentTheme ], 'hex').isLight() ?
          Color(COLORS[ props.currentTheme ]).darken(0.05).hex() :
          Color(COLORS[ props.currentTheme ]).lighten(0.6).hex()
        )
      )
    };
  }

  &:active {
    color: ${ props =>
      props.isDisabled ?
      getDisabledButtonFontColor(props.currentTheme) :
      (
        COLORS[ props.currentTheme ] === COLORS.DARK ?
        COLORS.LIGHT :
        'inherit'
      )
    };
    background-color: ${ props =>
      props.isDisabled ?
      getDisabledButtonBackgroundColor(props.currentTheme) :
      (
        COLORS[ props.currentTheme ] === COLORS.DARK ?
        Color(COLORS.DARK).hex() :
        (
          Color(COLORS[ props.currentTheme ], 'hex').isLight() ?
          Color(COLORS[ props.currentTheme ]).darken(0.025).hex() :
          Color(COLORS[ props.currentTheme ]).lighten(0.4).hex()
        )
      )
    };
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 0;
    flex-direction: column;
  }
`
