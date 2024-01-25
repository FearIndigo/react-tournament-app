import { ReactNode, useEffect, useMemo } from 'react'
import { useCurrentPath } from './hooks.ts'
import { useSpringRef, useTransition, animated } from '@react-spring/web'

type RouterViewProps = {
  routes: Route[]
}

type Route = { name: string; path: string; component: ReactNode }

function RouterView({ routes }: RouterViewProps) {
  const currentPath = useCurrentPath()
  const activeRoutes = useMemo(
    () => routes.filter((route) => route.path == currentPath),
    [routes, currentPath]
  )
  const transRef = useSpringRef()
  const [transitions] = useTransition(
    activeRoutes,
    {
      ref: transRef,
      config: {
        duration: 150,
      },
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0, position: 'absolute' },
    },
    [activeRoutes]
  )
  useEffect(() => {
    transRef.start()
  }, [activeRoutes])

  return (
    <>
      {transitions((style, route) => (
        <animated.div style={style} className='flex w-full justify-center'>
          {route.component}
        </animated.div>
      ))}
    </>
  )
}

export default RouterView
