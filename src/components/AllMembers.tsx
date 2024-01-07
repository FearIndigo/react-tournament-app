import MemberList from './MemberList.tsx'
import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading.tsx'
import { MemberDocType } from '../db/types/member'
import AddNewMemberButton from './AddNewMemberButton.tsx'
import EditModeToggle from './EditModeToggle.tsx'
import { useState } from 'react'
import TextInfo from './TextInfo.tsx'
import Card from './Card.tsx'
import Slot from './Slot.tsx'

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
    <Card className='bg-white/20 backdrop-blur-sm'>
      <Slot name='header'>
        <div className='flex h-full w-full items-center justify-between p-1'>
          <span className='px-2 font-bold'>Members</span>
          <div className='flex h-full flex-row items-center space-x-1'>
            <EditModeToggle
              editModeOff={editModeOff}
              onChange={setEditModeOff}
              title='Toggle edit mode all members'
            />
            <AddNewMemberButton />
          </div>
        </div>
      </Slot>
      <Slot name='content'>
        <div className='p-3 pt-2'>
          {members.length > 0 ? (
            <MemberList
              members={members}
              showEditButton={true}
              readOnly={editModeOff}
              className='space-y-2'
            />
          ) : isFetching ? (
            <TextLoading className='h-6' />
          ) : (
            <TextInfo text='No members' className='h-6' />
          )}
        </div>
      </Slot>
    </Card>
  )
}

export default AllMembers
