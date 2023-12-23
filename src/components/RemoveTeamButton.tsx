import { TeamDocument } from '../db/types/types'
import RemoveButton from './RemoveButton.tsx'

type RemoveTeamButtonProps = {
  team: TeamDocument
  title?: string
}

RemoveTeamButton.defaultProps = {
  title: 'Remove team',
}

function RemoveTeamButton({ team, title }: RemoveTeamButtonProps) {
  function removeTeam() {
    team.remove()
  }

  return <RemoveButton title={title} onClick={removeTeam} />
}

export default RemoveTeamButton
