import { useState } from 'react'
import Trophy from './components/Trophy.tsx'
import TabButtons from './components/TabButtons'
import CreatorScreen from './components/CreatorScreen'
import DataScreen from './components/DataScreen'
import StatsScreen from './components/StatsScreen.tsx'

function App() {
  const [tabIndex, updateTabIndex] = useState(0)

  return (
    <div className='bg-500 relative min-h-screen'>
      <div
        className='fixed left-0 top-0 h-screen w-full bg-repeat opacity-[0.1]'
        style={{ backgroundImage: 'url(/topography.svg)' }}
      />

      <main className='relative flex flex-col items-center'>
        <div className='flex flex-col items-center justify-center space-y-2 px-8 py-16 text-center text-violet-100'>
          <Trophy className='h-16 w-16' />
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

        <TabButtons
          tabs={['Creator', 'Data', 'Layout', 'Stats']}
          defaultTabIndex={tabIndex}
          onChanged={updateTabIndex}
          className='mb-8'
        />

        {tabIndex == 0 && <CreatorScreen />}
        {tabIndex == 1 && <DataScreen />}

        {tabIndex == 3 && <StatsScreen />}
      </main>
    </div>
  )
}

export default App
