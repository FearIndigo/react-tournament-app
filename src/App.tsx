import AllMembers from './components/AllMembers'
import AllTeams from './components/AllTeams'
import AllGames from './components/AllGames'
import AllTournaments from './components/AllTournaments.tsx'
import Trophy from './components/Trophy.tsx'

function App() {
  return (
    <div className='flex min-h-screen flex-col items-center bg-gradient-to-br from-violet-500 to-fuchsia-500'>
      <div className='flex flex-col items-center justify-center space-y-2 px-8 py-16 text-center text-blue-100'>
        <Trophy className='h-16 w-16 select-none' />
        <h1 className='text-5xl font-bold'>Tournament App</h1>
        <span>
          {'By '}
          <a
            href='https://github.com/JoeMcCleery'
            title='Joseph McCleery Github'
            target='_blank'
            rel='noreferrer'
          >
            Joseph McCleery
          </a>
        </span>
      </div>

      <div className='container grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        <AllMembers />
        <AllTeams />
        <AllGames />
        <AllTournaments />
      </div>
    </div>
  )
}

export default App
