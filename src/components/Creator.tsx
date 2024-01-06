import CreatorTournament from './CreatorTournament'
import { useState } from 'react'
import CreatorBrackets from './CreatorBrackets.tsx'
import { defaultCreatorData, CreatorData, deepCopy } from '../creator.ts'

function Creator() {
  const [data, setData] = useState<CreatorData>(defaultCreatorData)

  function updateCreatorData(newData: CreatorData) {
    setData(deepCopy(newData))
  }

  return (
    <div className='flex flex-col space-y-2 sm:w-60'>
      <CreatorTournament data={data} onChange={updateCreatorData} />
      <CreatorBrackets data={data} onChange={updateCreatorData} />
    </div>
  )
}

export default Creator
