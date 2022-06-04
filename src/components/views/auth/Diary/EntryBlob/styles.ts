// Packages:
import { styled } from 'solid-styled-components'
import Color from 'color'


// Typescript:
import { THEME } from '../../../../../styles/theme'


// Constants:
import COLORS from '../../../../../styles/color'


// Styles:
import { fadeIn } from '../../../../../styles/animations'

export const Wrapper = styled.div<{
  currentTheme: THEME
}>`
  width: calc(21.5rem - 3.5rem);
  max-height: calc(21.5rem - 3.5rem);
  margin: 0.7rem;
  padding: 1.75rem 1.5rem;
  color: ${ props =>
    (
      COLORS[ props.currentTheme ] === COLORS.DARK ?
      Color(COLORS.LIGHT).darken(0.25).hex() :
      (
        Color(COLORS[ props.currentTheme ], 'hex').isLight() ?
        Color(COLORS[ props.currentTheme ]).darken(0.5).hex() :
        Color(COLORS[ props.currentTheme ]).darken(0.35).hex()
      )
    )
  };
  background-color: ${ props =>
    (
      COLORS[ props.currentTheme ] === COLORS.DARK ?
      Color(COLORS.LIGHT).darken(0.95).hex() :
      (
        Color(COLORS[ props.currentTheme ], 'hex').isLight() ?
        Color(COLORS[ props.currentTheme ]).darken(0.075).hex() :
        Color(COLORS[ props.currentTheme ]).lighten(0.45).hex()
      )
    )
  };
  border-radius: 1.25rem;
  user-select: none;
  cursor: pointer;
  animation: ${ fadeIn() } 0.5s ease;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${ props =>
      (
        COLORS[ props.currentTheme ] === COLORS.DARK ?
        Color(COLORS.LIGHT).darken(0.9).hex() :
        (
          Color(COLORS[ props.currentTheme ], 'hex').isLight() ?
          Color(COLORS[ props.currentTheme ]).darken(0.05).hex() :
          Color(COLORS[ props.currentTheme ]).lighten(0.6).hex()
        )
      )
    };
  }

  &:active {
    color: ${ props => COLORS[ props.currentTheme ] === COLORS.DARK ? COLORS.LIGHT : 'inherit' };
    background-color: ${ props =>
      COLORS[ props.currentTheme ] === COLORS.DARK ?
      Color(COLORS.LIGHT).darken(0.95).hex() :
      (
        Color(COLORS[ props.currentTheme ], 'hex').isLight() ?
        Color(COLORS[ props.currentTheme ]).darken(0.025).hex() :
        Color(COLORS[ props.currentTheme ]).lighten(0.4).hex()
      )
    };
  }

  @media screen and (max-width: 470px) {
    width: calc(100% - 5rem);
    margin: 1rem;
  }
`

export const Title = styled.div`
  display: -webkit-box;
  max-height: 3.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.75rem;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Time = styled.div<{
  currentTheme: THEME
}>`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: ${ props => COLORS[ props.currentTheme ] === COLORS.DARK ? Color(COLORS.LIGHT).darken(0.5).hex() : Color(COLORS[ props.currentTheme ], 'hex').isLight() ?
    Color(COLORS[ props.currentTheme ]).darken(0.4).hex()
    :
    Color(COLORS[ props.currentTheme ]).darken(0.25).hex()
  };
`

export const Body = styled.div`
  display: -webkit-box;
  max-height: 12.375rem;
  margin-top: 0.75rem;
  line-height: 1.375rem;
  text-overflow: ellipsis;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Details = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-top: 0.5rem;
  font-size: 0.75rem;
`

export const Detail = styled.div`
  display: flex;
  align-items: center;
`

export const DetailText = styled.span`
  margin-left: 0.2rem;
  font-weight: 700;
  font-size: 0.75rem;
`
