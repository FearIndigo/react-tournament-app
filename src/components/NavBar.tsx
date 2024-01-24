import TabButtons from './TabButtons.tsx'
import { useCurrentPath, useNavigate } from '../router/hooks.ts'
import { useMemo } from 'react'

type NavBarProps = {
  links: { path: string; label: string }[]
}

function NavBar({ links }: NavBarProps) {
  const navigate = useNavigate()
  const currentPath = useCurrentPath()

  const tabIndex = useMemo(() => {
    const activeLink = links.find((link) => link.path == currentPath)
    return activeLink ? links.indexOf(activeLink) : -1
  }, [links, currentPath])

  function handleOnChanged(index: number) {
    navigate(links[index].path)
  }

  return (
    <TabButtons
      tabs={links.map((link) => link.label)}
      tabIndex={tabIndex}
      onChanged={handleOnChanged}
    />
  )
}

export default NavBar
