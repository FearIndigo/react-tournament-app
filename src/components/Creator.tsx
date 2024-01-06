import CreatorTournament from './CreatorTournament'
import { useState } from 'react'
import CreatorBrackets from './CreatorBrackets.tsx'
import { defaultCreatorData, copyData, CreatorData } from '../creator.ts'

function Creator() {
  const [data, setData] = useState<CreatorData>(defaultCreatorData)

  function updateCreatorData(newData: CreatorData) {
    setData(copyData(newData))
  }

  return (
    <div className='flex flex-col space-y-2 sm:w-60'>
      <CreatorTournament data={data} onChange={updateCreatorData} />
      <CreatorBrackets data={data} onChange={updateCreatorData} />
    </div>
  )
}

export default Creator
