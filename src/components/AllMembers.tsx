import MemberList from './MemberList.tsx'
import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading.tsx'
import { MemberDocType } from '../db/types/member'
import AddNewMemberButton from './AddNewMemberButton.tsx'

function AllMembers() {
  const { result: members, isFetching } = useRxData<MemberDocType>(
    'members',
    (collection) => collection.find()
  )

  return (
    <div className='flex w-60 flex-col rounded-3xl bg-blue-100/80 text-blue-800 backdrop-blur'>
      <div className='flex h-10 w-full items-center justify-between rounded-3xl bg-blue-300 p-1'>
        <span className='grow p-2 font-bold'>Members</span>
        <div className='flex h-full flex-row items-center space-x-1'>
          <AddNewMemberButton />
        </div>
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