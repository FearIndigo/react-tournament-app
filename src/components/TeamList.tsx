import Team from './Team.tsx'
import { TeamDocument } from '../db/types/types'

type TeamListProps = {
  teams: TeamDocument[]
  className?: string
  readOnly?: boolean
  showEditButton?: boolean
}

TeamList.defaultProps = {
  readOnly: true,
  className: '',
}

function TeamList({
  teams,
  className,
  readOnly,
  showEditButton,
}: TeamListProps) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {teams.map((team) => (
        <Team
          key={team.id}
          team={team}
          readOnly={readOnly}
          showEditButton={showEditButton}
        />
      ))}
    </div>
  )
}

export default TeamList
