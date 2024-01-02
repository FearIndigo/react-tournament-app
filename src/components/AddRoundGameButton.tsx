import AddNewButton from './AddNewButton.tsx'
import { RoundDocument } from '../db/types'
import { useRxCollection } from 'rxdb-hooks'
import { v4 as uuidv4 } from 'uuid'
import { GameDocType } from '../db/types/game'

type AddRoundGameButtonProps = {
  round: RoundDocument
}

function AddRoundGameButton({ round }: AddRoundGameButtonProps) {
  const gameCollection = useRxCollection<GameDocType>('games')

  async function addNewRoundGame() {
    if (gameCollection == undefined) return

    // Create new game
    const gameToAdd = await gameCollection.insert({
      id: uuidv4(),
      name: '',
      type: 'highestScore',
      scores: [],
      previous: '',
    })

    // Assign game to round
    round.incrementalPatch({
      games: [...round.games, gameToAdd.id],
    })
  }

  return <AddNewButton title='Add game to round' onClick={addNewRoundGame} />
}

export default AddRoundGameButton
