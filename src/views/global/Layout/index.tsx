// Packages:
import {
  Component,
  createSignal,
  JSXElement
} from 'solid-js'
import { useLocation, useNavigate } from 'solid-app-router'

// Typescript:
import { ILayoutProps, TGoToRoute } from './types'


// Constants:
import ROUTES from '../../../routes'


// Styles:
import { riseAndFadeOut } from '../../../styles/animations'


// Functions:
const Layout: Component<{ children: (props: ILayoutProps) => JSXElement }> = (props) => {
  // Constants:
  const location = useLocation()
  const navigate = useNavigate()

  // Signals:
  const [ wrapperAnimation, setWrapperAnimation ] = createSignal('')

  // Functions:
  const goToRoute: TGoToRoute = async ({
    route,
    animationY,
    animationMilliseconds
  }) => {
    setWrapperAnimation(`${ riseAndFadeOut(animationY) } ${ animationMilliseconds ? (animationMilliseconds / 1000) : 0.5 }s ease`)
    await new Promise(resolve => setTimeout(resolve, animationMilliseconds ? animationMilliseconds : 500))
    navigate(route, { replace: true, state: { prev: location.pathname } })
  }

  // NOTE: WIP since there is no history.pop() alternative for SolidJS
  const goBack = async (targetRoute?: string) => {
    setWrapperAnimation(`${ riseAndFadeOut() } 0.5s ease`)
    await new Promise(resolve => setTimeout(resolve, 500))
    navigate(targetRoute ?? ((location.state as { prev?: string }).prev ?? ROUTES.AUTH.HOME), { replace: true })
  }

  // Return:
  return (
    <>
      {
        props.children({
          wrapperAnimation,
          goToRoute,
          goBack
        })
      }
    </>
  )
}


// Exports:
export default Layout
