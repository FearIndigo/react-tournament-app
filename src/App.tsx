import Trophy from './components/Trophy.tsx'
import Footer from './components/Footer.tsx'
import topography from './assets/topography.svg'
import RouterView from './router/RouterView.tsx'
import CreatorScreen from './components/CreatorScreen.tsx'
import DataScreen from './components/DataScreen.tsx'
import StatsScreen from './components/StatsScreen.tsx'
import NavBar from './components/NavBar.tsx'

const routes = [
  { name: 'Creator', path: '/creator', component: <CreatorScreen /> },
  { name: 'Data', path: '/data', component: <DataScreen /> },
  { name: 'Layout', path: '/layout', component: '' },
  { name: 'Stats', path: '/stats', component: <StatsScreen /> },
]

function App() {
  return (
    <div className='bg-500 relative flex min-h-screen flex-col justify-between space-y-8 overflow-hidden'>
      <div
        className='fixed left-0 top-0 h-screen w-full bg-repeat opacity-[0.1]'
        style={{ backgroundImage: `url(${topography})` }}
      />

      <main className='relative flex flex-col items-center space-y-8'>
        <div className='flex flex-col items-center justify-center space-y-2 px-8 py-16 text-center text-violet-100'>
          <Trophy className='h-16 w-16' />
          <h1 className='text-5xl font-bold'>Tournament App</h1>
          <span>
            {'By '}
            <a
              href='https://joemccleery.com.au'
              title='Joseph McCleery Website'
              target='_blank'
              rel='noreferrer'
            >
              Joseph McCleery
            </a>
          </span>
        </div>

        <div className='container w-full px-4 md:w-auto'>
          <NavBar
            links={routes.map((route) => ({
              path: route.path,
              label: route.name,
            }))}
          />
        </div>

        <div className='container w-full px-4'>
          <div className='relative w-full'>
            <RouterView routes={routes} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
