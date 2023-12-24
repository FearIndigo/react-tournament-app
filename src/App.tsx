import AllMembers from './components/AllMembers'
import AllTeams from './components/AllTeams'
import AllGames from './components/AllGames'

function App() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center space-y-4 bg-gradient-to-br from-violet-500 to-fuchsia-500 p-4 md:flex-row md:space-x-4 md:space-y-0'>
      <AllMembers />
      <AllTeams />
      <AllGames />
    </div>
  )
}

export default App
