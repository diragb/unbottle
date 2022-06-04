// Packages:
import { styled } from 'solid-styled-components'
import Color from 'color'


// Typescript:
import { THEME } from '../../../../../styles/theme'


// Constants:
import COLORS from '../../../../../styles/color'


// Styles:
import { fadeIn } from '../../../../../styles/animations'

export const Wrapper = styled.div<{ isSolo: boolean }>`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - ${ props => props.isSolo ? 15.5 : 11 }rem);
  margin-top: 5rem;
  word-break: break-word;
  animation: ${ fadeIn(3) } 0.5s ease;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin-top: 2rem;
  }

  @media screen and (max-width: 768px) {
    margin-top: 0;
  }
`

export const EntrySection = styled.div`
  width: 55%;
  min-width: 50vw;

  @media screen and (max-width: 768px) {
    width: auto;
  }
`

export const Title = styled.div`
  display: -webkit-box;
  font-size: 2rem;
  font-weight: 700;
`

export const MetaDetails = styled.div<{
  currentTheme: THEME
}>`
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${ props =>
    COLORS[ props.currentTheme ] === COLORS.DARK ?
    Color(COLORS.LIGHT).darken(0.5).hex() :
    (
      Color(COLORS[ props.currentTheme ], 'hex').isLight() ?
      Color(COLORS[ props.currentTheme ]).darken(0.4).hex() :
      Color(COLORS[ props.currentTheme ]).lighten(0.6).hex()
    )
  };
  user-select: none;
`

export const MetaDetail = styled.div`
  display: flex;
  align-items: center;
`

export const Time = styled(MetaDetail)``

export const DividerDot = styled.div`
  margin: 0 0.5rem;
`

export const ReadingTime = styled(MetaDetail)<{
  currentTheme: THEME
}>`
  transition: all 0.25s ease;
  
  &:hover {
    color: ${ props => [ COLORS.LIGHT, COLORS.DARK ].includes(COLORS[ props.currentTheme ]) ? '#77AD78' : 'inherit' };
  }
`

export const Distance = styled(MetaDetail)<{
  currentTheme: THEME
}>`
  transition: all 0.25s ease;
  
  &:hover {
    color: ${ props => [ COLORS.LIGHT, COLORS.DARK ].includes(COLORS[ props.currentTheme ]) ? '#FF715B' : 'inherit' };
  }
`

export const Body = styled.div`
  margin-top: 1.5rem;
  font-size: 1.25rem;
`

export const Details = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-top: 1rem;
  font-size: 1rem;
  user-select: none;
`

export const Detail = styled.div`
  display: flex;
  align-items: center;
`

export const DetailText = styled.span`
  margin-left: 0.25rem;
  font-weight: 700;
  font-size: 1rem;
`
