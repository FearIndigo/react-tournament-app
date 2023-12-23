import AddNewButton from './AddNewButton.tsx'
import { useRxCollection } from 'rxdb-hooks'
import { TeamDocType } from '../db/types/team'

function AddNewTeamButton() {
  const collection = useRxCollection<TeamDocType>('teams')
  function addNewTeam() {
    collection?.insert({
      id: crypto.randomUUID(),
      name: '',
      members: [],
    })
  }

  return <AddNewButton title='Add new team' onClick={addNewTeam} />
}

export default AddNewTeamButton
