import { ReactNode } from 'react'
import { useSlots } from '../hooks.tsx'

type CardProps = {
  className?: string
  children?: ReactNode
}

Card.defaultProps = {
  className: '',
}

function Card({ className, children }: CardProps) {
  const slots = useSlots(children)
  return (
    <div
      className={`flex w-full flex-col items-center rounded-3xl text-violet-800 ${className}`}
    >
      <div className='bg-300 flex h-10 w-full items-center rounded-3xl'>
        {slots.header}
      </div>
      {slots.content}
    </div>
  )
}

export default Card
