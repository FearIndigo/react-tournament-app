import { ReactNode } from 'react'

type ScreenProps = {
  visible?: boolean
  children?: ReactNode
}

Screen.defaultProps = {
  visible: true,
}

function Screen({ visible, children }: ScreenProps) {
  return (
    <div
      className={`flex w-full justify-center transition-opacity duration-300 ease-in-out ${
        visible
          ? 'relative opacity-100'
          : 'pointer-events-none absolute left-0 top-0 opacity-0'
      }`}
    >
      {children}
    </div>
  )
}

export default Screen
