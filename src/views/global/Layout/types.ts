// Exports:
export interface ILayoutProps {
  wrapperAnimation: () => string
  goToRoute: TGoToRoute
  goBack: (route: string) => Promise<void>
}

export type TGoToRoute = (props: {
  route: string
  animationY?: number
  animationMilliseconds?: number
}) => Promise<void>
