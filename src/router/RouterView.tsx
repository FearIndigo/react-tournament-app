import { ReactNode } from 'react'
import { useCurrentPath } from './hooks.ts'

type RouterViewProps = {
  routes: { name: string; path: string; component: ReactNode }[]
}

function RouterView({ routes }: RouterViewProps) {
  const currentPath = useCurrentPath()

  return (
    <>{routes.map((route) => currentPath == route.path && route.component)}</>
  )
}

export default RouterView
