import MemberList from './MemberList.tsx'
import {
  CheckIcon,
  ChevronDownIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import TextInput from './TextInput.tsx'
import { MemberCollection, TeamDocument } from '../db/types/types'
import { useRxData } from 'rxdb-hooks'
import { MemberDocType } from '../db/types/member'
import TextLoading from './TextLoading.tsx'

type TeamProps = {
  team: TeamDocument
  showMembers?: boolean
  readOnly?: boolean
  showEditButton?: boolean
}

Team.defaultProps = {
  readOnly: true,
}

function Team({ team, showMembers, readOnly, showEditButton }: TeamProps) {
  const [showList, setShowList] = useState(showMembers)
  const [locked, setLocked] = useState(readOnly)
  const { result: members, isFetching } = useRxData<MemberDocType>(
    'members',
    (collection: MemberCollection) =>
      collection.find({
        selector: {
          id: { $in: team.members },
        },
      })
  )

  function updateName(name: string) {
    team.incrementalPatch({
      name: name,
    })
  }

  return (
    <div className='flex flex-col rounded-3xl bg-blue-100 text-blue-800'>
      <div className='h-10 rounded-3xl bg-blue-300 p-1'>
        <div className='flex h-full items-center justify-between space-x-1'>
          {locked ? (
            <span className='truncate rounded-3xl p-2 font-bold'>
              {team.name}
            </span>
          ) : (
            <TextInput
              value={team.name}
              onChange={updateName}
              className='h-full font-bold'
            />
          )}

          <div className='flex h-full space-x-1 self-end'>
            {showEditButton && (
              <div className='relative'>
                {!locked && (
                  <span className='absolute left-1 top-1 h-6 w-6 animate-ping rounded-full bg-blue-100' />
                )}
                <button
                  title='Toggle edit mode'
                  className='relative z-10 h-full w-8 rounded-3xl bg-blue-100 p-2 shadow'
                  onClick={() => setLocked(!locked)}
                >
                  {locked ? <PencilIcon /> : <CheckIcon />}
                </button>
              </div>
            )}
            <button
              title='Toggle members view'
              className='h-full w-8 rounded-3xl bg-blue-100 p-2 shadow'
              onClick={() => setShowList(!showList)}
            >
              <ChevronDownIcon
                className={`transition-all duration-300 ease-in-out ${
                  showList ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showList ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className='p-2 pt-1'>
          {isFetching ? (
            <TextLoading className='h-6' />
          ) : (
            <MemberList members={members} readOnly={locked} className='' />
          )}
        </div>
      </div>
    </div>
  )
}

export default Team
