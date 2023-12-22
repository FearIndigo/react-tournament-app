import MemberList from './MemberList.tsx'
import { useRxData } from 'rxdb-hooks'
import { TeamDocType } from '../db/types/team'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import TextLoading from './TextLoading.tsx'
import { useState } from 'react'
import TextMissing from './TextMissing.tsx'
import TextInput from './TextInput.tsx'
import { TeamDocument } from '../db/types/types'

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

  function updateName(team: TeamDocument, name: string) {
    team.incrementalPatch({
      name: name,
    })
  }

  let content
  let title

  if (isFetching) {
    // Fetching
    title = <TextLoading className='h-full' />
  } else if (result?.length == 0) {
    // No records
    title = <TextMissing className='h-full' />
  } else {
    // Render
    const team = result[0]
    title = (
      <div className='flex h-full items-center justify-between space-x-1 pl-2'>
        {readOnly ? (
          <span className='truncate font-bold'>{team.name}</span>
        ) : (
          <TextInput
            value={team.name}
            onChange={(name) => updateName(team, name)}
            className='h-full'
          />
        )}
        <button
          className='aspect-square h-full rounded-3xl bg-white bg-opacity-50 p-1 shadow'
          onClick={() => setShowList(!showList)}
        >
          <ChevronDownIcon
            className={`transition-all duration-300 ease-in-out ${
              showList ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
      </div>
    )
    content = (
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showList ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <MemberList members={team.members} readOnly={readOnly} />
      </div>
    )
  }

  return (
    <div className='flex w-40 flex-col rounded-3xl bg-blue-200 text-blue-800'>
      <div className='h-10 rounded-3xl bg-blue-300 p-1'>{title}</div>
      {content}
    </div>
  )
}

export default Member
