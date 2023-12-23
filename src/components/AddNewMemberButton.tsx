import AddNewButton from './AddNewButton.tsx'
import { useRxCollection } from 'rxdb-hooks'
import { MemberDocType } from '../db/types/member'

function AddNewMemberButton() {
  const collection = useRxCollection<MemberDocType>('members')
  function addNewMember() {
    collection?.insert({
      id: crypto.randomUUID(),
      name: 'New Member',
    })
  }

  return <AddNewButton title='Add new member' onClick={addNewMember} />
}

export default AddNewMemberButton
