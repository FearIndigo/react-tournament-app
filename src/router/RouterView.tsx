import { ReactNode } from 'react'
import { useCurrentPath } from './hooks.ts'

type RouterViewProps = {
  routes: Route[]
  renderFunc: (route: Route) => ReactNode
}

type Route = { name: string; path: string; component: ReactNode }

RouterView.defaultProps = {
  renderFunc: (route: Route) => route.component,
}

function RouterView({ routes, renderFunc }: RouterViewProps) {
  const currentPath = useCurrentPath()

  return routes.map((route) => currentPath == route.path && renderFunc(route))
}

export default RouterView
