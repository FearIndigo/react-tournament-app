import { ReactNode } from 'react'

type CreatorContainerProps = {
  title: string
  children?: ReactNode
}

function CreatorContainer({ title, children }: CreatorContainerProps) {
  return (
    <div className='flex w-full flex-col items-center justify-center rounded-3xl bg-blue-100/50 backdrop-blur'>
      <h2 className='bg-300 flex h-10 w-full items-center justify-center rounded-3xl p-2 font-bold'>
        {title}
      </h2>
      <div className='flex flex-col space-y-2 p-3'>{children}</div>
    </div>
  )
}

export default CreatorContainer
