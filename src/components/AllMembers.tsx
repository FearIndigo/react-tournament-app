import MemberList from './MemberList.tsx'
import { useRxCollection, useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading.tsx'
import { MemberDocType } from '../db/types/member'
import AddNewButton from './AddNewButton.tsx'

function AllMembers() {
  const { result: members, isFetching } = useRxData<MemberDocType>(
    'members',
    (collection) => collection.find()
  )
  const collection = useRxCollection<MemberDocType>('members')
  function addNewMember() {
    collection?.insert({
      id: crypto.randomUUID(),
    })
  }

  return (
    <div className='flex w-60 flex-col rounded-3xl bg-blue-100/80 text-blue-800 backdrop-blur'>
      <div className='flex h-10 w-full items-center justify-between rounded-3xl bg-blue-300 p-1'>
        <span className='p-2 font-bold'>Members</span>
        <AddNewButton title='Add new member' onClick={addNewMember} />
      </div>
      <div className='p-3 pt-2'>
        {isFetching ? (
          <TextLoading className='h-8' />
        ) : (
          <MemberList
            members={members}
            showEditButton={true}
            className='space-y-2'
          />
        )}
      </div>
    </div>
  )
}

export default AllMembers
