import { ReactNode } from 'react'

type SlotProps = {
  name: string
  children?: ReactNode
}

function Slot(props: SlotProps) {
  return <>{props.children}</>
}

export default Slot
