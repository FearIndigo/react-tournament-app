import AddNewButton from './AddNewButton.tsx'
import { BracketDocument } from '../db/types'
import { useRxCollection } from 'rxdb-hooks'
import { v4 as uuidv4 } from 'uuid'
import { RoundDocType } from '../db/types/round'
import TextInput from './TextInput.tsx'
import { useState } from 'react'

type AddBracketRoundProps = {
  bracket: BracketDocument
}

function AddBracketRound({ bracket }: AddBracketRoundProps) {
  const [roundName, setRoundName] = useState('')
  const roundCollection = useRxCollection<RoundDocType>('rounds')

  async function addNewBracketRound() {
    if (roundCollection == undefined) return

    // Create new round
    const roundToAdd = await roundCollection.insert({
      id: uuidv4(),
      name: '',
      games: [],
    })

    // Assign round to bracket
    bracket.incrementalPatch({
      rounds: [...bracket.rounds, roundToAdd.id],
    })
  }

  return (
    <div className='flex h-8 items-center space-x-1'>
      <TextInput
        onChange={setRoundName}
        placeholder={`Round ${bracket.rounds.length + 1}`}
        value={roundName}
        className='h-full w-full'
      />
      <div className='flex h-full items-center'>
        <AddNewButton
          title='Add round to bracket'
          onClick={addNewBracketRound}
        />
      </div>
    </div>
  )
}

export default AddBracketRound
