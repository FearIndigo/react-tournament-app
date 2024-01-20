import { ReactNode } from 'react'

type CollapsibleProps = {
  open: boolean
  className?: string
  children?: ReactNode
}

Collapsible.defaultProps = {
  className: '',
}

function Collapsible({ open, className, children }: CollapsibleProps) {
  return (
    <div
      className={`grid transition-[grid-template-rows_opacity] duration-300 ease-in-out ${
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      } ${className}`}
    >
      <div className='overflow-hidden'>{children}</div>
    </div>
  )
}

export default Collapsible
