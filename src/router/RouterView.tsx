import { Fragment, ReactNode } from 'react'
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

  return routes.map((route) =>
    route.path == currentPath ? (
      <Fragment key={route.path}>{renderFunc(route)}</Fragment>
    ) : null
  )
}

export default RouterView
