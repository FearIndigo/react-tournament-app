import AddNewButton from './AddNewButton'
import { useRxCollection } from 'rxdb-hooks'
import { v4 as uuidv4 } from 'uuid'
import { GameDocType } from '../db/types/game'

function AddNewGameButton() {
  const collection = useRxCollection<GameDocType>('games')
  function addNewGame() {
    collection?.insert({
      id: uuidv4(),
      name: '',
      type: 'highestScore',
      scores: [],
      previous: '',
    })
  }

  return <AddNewButton title='Add new game' onClick={addNewGame} />
}

export default AddNewGameButton
