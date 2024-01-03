import AllMembers from './AllMembers.tsx'
import AllTeams from './AllTeams.tsx'
import AllGames from './AllGames.tsx'
import AllTournaments from './AllTournaments.tsx'

function GridScreen() {
  return (
    <div className='container grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
      <AllMembers />
      <AllTeams />
      <AllGames />
      <AllTournaments />
    </div>
  )
}

export default GridScreen
