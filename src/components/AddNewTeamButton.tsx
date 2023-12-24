import AddNewButton from './AddNewButton.tsx'
import { useRxCollection } from 'rxdb-hooks'
import { TeamDocType } from '../db/types/team'
import { v4 as uuidv4 } from 'uuid'

function AddNewTeamButton() {
  const collection = useRxCollection<TeamDocType>('teams')
  function addNewTeam() {
    collection?.insert({
      id: uuidv4(),
      name: '',
      members: [],
    })
  }

  return <AddNewButton title='Add new team' onClick={addNewTeam} />
}

export default AddNewTeamButton
