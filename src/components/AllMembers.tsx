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
    (collection) =>
      collection.find({
        index: ['createdAt'],
      })
  )

  return (
    <div className='flex flex-col rounded-3xl bg-white/20 text-violet-800 backdrop-blur-sm'>
      <div className='bg-300 flex h-10 w-full items-center justify-between rounded-3xl p-1'>
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
