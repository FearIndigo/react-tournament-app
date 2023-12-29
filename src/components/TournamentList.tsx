import { TournamentDocument } from '../db/types'
import Tournament from './Tournament.tsx'

type TournamentListProps = {
  tournaments: TournamentDocument[]
  className?: string
  readOnly?: boolean
  showEditButton?: boolean
}

TournamentList.defaultProps = {
  readOnly: true,
  className: '',
}

function TournamentList({
  tournaments,
  className,
  readOnly,
  showEditButton,
}: TournamentListProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {tournaments.map((tournament) => (
        <Tournament
          key={tournament.id}
          tournament={tournament}
          readOnly={readOnly}
          showEditButton={showEditButton}
        />
      ))}
    </div>
  )
}

export default TournamentList
