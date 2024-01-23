import { Children, ReactElement, ReactNode, useMemo, useState } from 'react'
import Slot from './components/Slot.tsx'

export function useSlots(children: ReactNode) {
  return useMemo<Record<string, ReactNode>>(
    () =>
      Children.toArray(children).reduce(
        (result: Record<string, ReactNode>, child) => {
          const childElement = child as ReactElement
          if (childElement.type == Slot) {
            if (childElement.props.name != '') {
              result[childElement.props.name] = child
            } else {
              result.default = (
                <>
                  {result.default}
                  {childElement}
                </>
              )
            }
          }
          return result
        },
        { default: null }
      ),
    [children]
  )
}

export function usePropState<T>(propValue: T) {
  const [state, setState] = useState(propValue)

  const [prevPropValue, setPrevPropValue] = useState(propValue)
  if (prevPropValue != propValue) {
    setPrevPropValue(propValue)

    if (state != propValue) {
      setState(propValue)
    }
  }

  return [state, setState] as const
}
