import CreatorTournament from './CreatorTournament'
import { useState } from 'react'
import CreatorBrackets from './CreatorBrackets.tsx'
import { defaultCreatorData, CreatorData, deepCopy } from '../creator.ts'
import CreatorSubmit from './CreatorSubmit.tsx'

function CreatorScreen() {
  const [data, setData] = useState<CreatorData>(defaultCreatorData)
  function updateCreatorData(newData: CreatorData) {
    setData(deepCopy(newData))
  }

  return (
    <div className='flex w-full flex-col space-y-4 md:w-96'>
      <CreatorTournament data={data} onChange={updateCreatorData} />
      <CreatorBrackets data={data} onChange={updateCreatorData} />
      <CreatorSubmit data={data} />
    </div>
  )
}

export default CreatorScreen
