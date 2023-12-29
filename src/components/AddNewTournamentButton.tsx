import AddNewButton from './AddNewButton'
import { useRxCollection } from 'rxdb-hooks'
import { v4 as uuidv4 } from 'uuid'
import { TournamentDocType } from '../db/types/tournament'

function AddNewTournamentButton() {
  const collection = useRxCollection<TournamentDocType>('tournaments')
  function addNewTournament() {
    collection?.insert({
      id: uuidv4(),
      name: 'New Tournament',
      brackets: [],
    })
  }

  return <AddNewButton title='Add new tournament' onClick={addNewTournament} />
}

export default AddNewTournamentButton
