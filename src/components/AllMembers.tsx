import MemberList from './MemberList.tsx'
import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading.tsx'
import { MemberDocType } from '../db/types/member'
import AddNewMemberButton from './AddNewMemberButton.tsx'
import EditModeToggle from './EditModeToggle.tsx'
import { useState } from 'react'

function AllMembers() {
  const [editModeOff, setEditModeOff] = useState(true)
  const { result: members, isFetching } = useRxData<MemberDocType>(
    'members',
    (collection) => collection.find()
  )

  return (
    <div className='flex w-60 flex-col rounded-3xl bg-blue-100/80 text-blue-800 backdrop-blur'>
      <div className='flex h-10 w-full items-center justify-between rounded-3xl bg-blue-300 p-1'>
        <span className='grow p-2 font-bold'>Members</span>
        <div className='flex h-full flex-row items-center space-x-1'>
          <EditModeToggle
            onChange={setEditModeOff}
            title='Toggle edit mode all members'
          />
          <AddNewMemberButton />
        </div>
      </div>
      <div className='p-3 pt-2'>
        {isFetching ? (
          <TextLoading className='h-6' />
        ) : (
          <MemberList
            members={members}
            showEditButton={true}
            readOnly={editModeOff}
            className='space-y-2'
          />
        )}
      </div>
    </div>
  )
}

export default AllMembers
