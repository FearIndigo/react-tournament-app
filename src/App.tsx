import AllMembers from './components/AllMembers.tsx'
import AllTeams from './components/AllTeams.tsx'

function App() {
  return (
    <div className='flex min-h-screen items-center justify-center space-x-4 bg-gradient-to-br from-violet-500 to-fuchsia-500'>
      <AllMembers />
      <AllTeams />
    </div>
  )
}

export default App
