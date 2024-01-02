import AddNewButton from './AddNewButton.tsx'
import { BracketDocument } from '../db/types'
import { useRxCollection } from 'rxdb-hooks'
import { v4 as uuidv4 } from 'uuid'
import { RoundDocType } from '../db/types/round'

type AddBracketRoundButtonProps = {
  bracket: BracketDocument
}

function AddBracketRoundButton({ bracket }: AddBracketRoundButtonProps) {
  const roundCollection = useRxCollection<RoundDocType>('rounds')

  async function addNewBracketRound() {
    if (roundCollection == undefined) return

    const previousRound =
      bracket.rounds.length > 0 ? bracket.rounds[bracket.rounds.length - 1] : ''

    // Create new round
    const roundToAdd = await roundCollection.insert({
      id: uuidv4(),
      name: '',
      games: [],
      previous: previousRound,
    })

    // Assign round to bracket
    bracket.incrementalPatch({
      rounds: [...bracket.rounds, roundToAdd.id],
    })
  }

  return (
    <AddNewButton title='Add round to bracket' onClick={addNewBracketRound} />
  )
}

export default AddBracketRoundButton
