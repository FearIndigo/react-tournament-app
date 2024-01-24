import TabButtons from './TabButtons.tsx'
import { useCurrentPath, useNavigate } from '../router/hooks.ts'

type NavBarProps = {
  links: { path: string; label: string }[]
}

function NavBar({ links }: NavBarProps) {
  const navigate = useNavigate()
  const currentPath = useCurrentPath()

  const activeLink = links.find((link) => link.path == currentPath)
  const tabIndex = activeLink ? links.indexOf(activeLink) : -1

  function handleOnChanged(index: number) {
    navigate(links[index].path)
  }

  return (
    <TabButtons
      tabs={links.map((link) => link.label)}
      defaultTabIndex={tabIndex}
      onChanged={handleOnChanged}
    />
  )
}

export default NavBar
