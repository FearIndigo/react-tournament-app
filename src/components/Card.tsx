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
    <div className='w-full'>
      <div
        className={`mx-2 flex h-full flex-col rounded-3xl text-violet-800 ${className}`}
      >
        <div className='bg-300 -mx-2 flex h-10 items-center rounded-3xl'>
          {slots.header}
        </div>
        {slots.content}
      </div>
    </div>
  )
}

export default Card
