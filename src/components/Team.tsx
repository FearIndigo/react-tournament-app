import MemberList from './MemberList.tsx'
import { useRxData } from 'rxdb-hooks'
import { TeamDocType } from '../db/types/team'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import TextLoading from './TextLoading.tsx'
import { useState } from 'react'

type TeamProps = {
  teamId: string
  showMembers?: boolean
  readOnly?: boolean
}

function Member({ teamId, showMembers, readOnly }: TeamProps) {
  const [showList, setShowList] = useState(showMembers)

  const { result: result, isFetching } = useRxData<TeamDocType>(
    'teams',
    (collection) =>
      collection.find({
        selector: {
          id: teamId,
        },
      })
  )

  let content

  if (isFetching) {
    // Fetching
    content = <TextLoading className='h-8 rounded-2xl bg-blue-300 p-1' />
  } else if (result?.length == 0) {
    // No records
    content = <span className='text-red-500'>missing!</span>
  } else {
    // Render
    const team = result[0]
    content = (
      <>
        <div className='flex h-8 items-center justify-between space-x-1 rounded-2xl bg-blue-300 p-1 pl-3'>
          <span className='grow truncate font-bold'>{team.name}</span>
          <button
            className='aspect-square h-full rounded-2xl bg-blue-200 p-1 shadow'
            onClick={() => setShowList(!showList)}
          >
            <ChevronDownIcon
              className={`transition-all duration-300 ease-in-out ${
                showList ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showList ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <MemberList members={team.members} readOnly={readOnly} />
        </div>
      </>
    )
  }

  return (
    <div className='flex w-40 flex-col rounded-2xl bg-blue-200 text-blue-900'>
      {content}
    </div>
  )
}

export default Member
