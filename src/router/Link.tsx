import { ReactNode, MouseEvent } from 'react'
import { useCurrentPath, useNavigate } from './hooks.ts'

type LinkProps = {
  to: string
  title?: string
  className?: string
  children?: ReactNode
}

Link.defaultProps = {
  className: '',
}

function Link({ to, title, className, children }: LinkProps) {
  const currentPath = useCurrentPath()
  const navigate = useNavigate()

  function handleOnClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    navigate(to)
  }

  return (
    <a
      href={to}
      onClick={handleOnClick}
      title={title}
      className={`${className} ${currentPath == to ? 'link-active' : ''}`}
    >
      {children}
    </a>
  )
}

export default Link
