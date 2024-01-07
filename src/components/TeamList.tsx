import Team from './Team.tsx'
import { TeamDocument } from '../db/types'

type TeamListProps = {
  teams: TeamDocument[]
  className?: string
  readOnly?: boolean
  showEditButton?: boolean
  showMembers?: boolean
}

TeamList.defaultProps = {
  className: '',
}

function TeamList({
  teams,
  className,
  readOnly,
  showEditButton,
  showMembers,
}: TeamListProps) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {teams.map((team) => (
        <Team
          key={team.id}
          team={team}
          readOnly={readOnly}
          showEditButton={showEditButton}
          showMembers={showMembers}
        />
      ))}
    </div>
  )
}

export default TeamList
