import MemberList from './MemberList.tsx'
import { useState } from 'react'
import TextInput from './TextInput.tsx'
import { MemberCollection, TeamDocument } from '../db/types/types'
import { useRxData } from 'rxdb-hooks'
import { MemberDocType } from '../db/types/member'
import TextLoading from './TextLoading.tsx'
import EditModeToggle from './EditModeToggle.tsx'
import AccordionOpenToggle from './AccordionOpenToggle.tsx'
import AddTeamMember from './AddTeamMember.tsx'

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
  const [membersVisible, setMembersVisible] = useState(showMembers)
  const [editModeOff, setEditModeOff] = useState(readOnly)
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
          {editModeOff ? (
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

          <div className='flex h-full space-x-1'>
            {showEditButton && (
              <EditModeToggle readOnly={readOnly} onChange={setEditModeOff} />
            )}
            <AccordionOpenToggle
              open={membersVisible}
              onChange={setMembersVisible}
            />
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          membersVisible ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className='flex flex-col space-y-2 p-2 pt-1'>
          {isFetching ? (
            <TextLoading className='h-6' />
          ) : (
            <MemberList members={members} readOnly={editModeOff} className='' />
          )}
        </div>
        {!editModeOff && (
          <div className='p-2 pt-0'>
            <AddTeamMember team={team} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Team
