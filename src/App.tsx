import Trophy from './components/Trophy.tsx'
import TabButtons from './components/TabButtons.tsx'
import GridScreen from './components/GridScreen.tsx'
import { useState } from 'react'

function App() {
  const [tabIndex, updateTabIndex] = useState(0)

  return (
    <div className='bg-500 relative min-h-screen'>
      <div
        className='absolute left-0 top-0 h-full w-full bg-repeat opacity-[0.05]'
        style={{ backgroundImage: 'url(/topography.svg)' }}
      />

      <main className='relative flex flex-col items-center'>
        <div className='flex flex-col items-center justify-center space-y-2 px-8 py-16 text-center text-blue-50'>
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

        {tabIndex == 1 && <GridScreen />}
      </main>
    </div>
  )
}

export default App
