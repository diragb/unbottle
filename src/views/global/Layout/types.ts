// Exports:
export interface ILayoutProps {
  wrapperAnimation: () => string
  goToRoute: TGoToRoute
  goBack: (route: string) => Promise<void>
}

export type TGoToRoute = (props: {
  route: string
  state?: object
  animationY?: number
  animationMilliseconds?: number
  customAnimation?: string
}) => Promise<void>
