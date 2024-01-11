import AllMembers from './AllMembers.tsx'
import AllTeams from './AllTeams.tsx'
import AllGames from './AllGames.tsx'
import AllTournaments from './AllTournaments.tsx'

type DataScreenProps = {
  className?: string
}

DataScreen.defaultProps = {
  className: '',
}

function DataScreen({ className }: DataScreenProps) {
  return (
    <div
      className={`grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ${className}`}
    >
      <AllMembers />
      <AllTeams />
      <AllGames />
      <AllTournaments />
    </div>
  )
}

export default DataScreen
