import AddNewButton from './AddNewButton.tsx'
import { useRxCollection } from 'rxdb-hooks'
import { MemberDocType } from '../db/types/member'
import { v4 as uuidv4 } from 'uuid'

function AddNewMemberButton() {
  const collection = useRxCollection<MemberDocType>('members')
  function addNewMember() {
    collection?.insert({
      id: uuidv4(),
      name: 'New Member',
    })
  }

  return <AddNewButton title='Add new member' onClick={addNewMember} />
}

export default AddNewMemberButton
