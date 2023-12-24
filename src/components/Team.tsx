import MemberList from './MemberList.tsx'
import { useEffect, useState } from 'react'
import TextInput from './TextInput.tsx'
import { MemberCollection, TeamDocument } from '../db/types'
import { useRxData } from 'rxdb-hooks'
import { MemberDocType } from '../db/types/member'
import TextLoading from './TextLoading.tsx'
import EditModeToggle from './EditModeToggle.tsx'
import AccordionOpenToggle from './AccordionOpenToggle.tsx'
import AddTeamMember from './AddTeamMember.tsx'
import RemoveTeamButton from './RemoveTeamButton.tsx'

type TeamProps = {
  team: TeamDocument
  showMembers?: boolean
  readOnly?: boolean
  className?: string
  showEditButton?: boolean
}

Team.defaultProps = {
  readOnly: true,
  className: '',
}

function Team({
  team,
  showMembers,
  readOnly,
  className,
  showEditButton,
}: TeamProps) {
  const [membersVisible, setMembersVisible] = useState(showMembers)
  const [editModeOff, setEditModeOff] = useState(readOnly)
  const { result: members, isFetching } = useRxData<MemberDocType>(
    'members',
    (collection: MemberCollection) =>
      collection.find({
        selector: {
          id: { $in: team.members },
        },
        index: ['createdAt'],
      })
  )

  useEffect(() => {
    setMembersVisible(showMembers)
  }, [showMembers])

  useEffect(() => {
    setEditModeOff(readOnly)
  }, [readOnly])

  function updateName(name: string) {
    team.incrementalPatch({
      name: name,
    })
  }

  const teamName =
    team.name != ''
      ? team.name
      : isFetching
        ? '...'
        : members.length > 0
          ? members.map((member) => member.name).join(' + ')
          : 'New Team'

  return (
    <div
      className={`flex flex-col rounded-3xl bg-blue-100 text-blue-800 ${className}`}
    >
      <div className='h-10 rounded-3xl bg-blue-300 p-1'>
        <div className='flex h-full items-center justify-between space-x-1'>
          {editModeOff ? (
            <span className='truncate rounded-3xl p-2 font-bold'>
              {teamName}
            </span>
          ) : (
            <TextInput
              value={team.name}
              placeholder={teamName == '' ? 'Team name...' : teamName}
              onChange={updateName}
              className='font-bold'
            />
          )}

          <div className='flex h-full space-x-1'>
            {!editModeOff && <RemoveTeamButton team={team} />}
            {showEditButton && (
              <EditModeToggle
                readOnly={readOnly}
                onChange={setEditModeOff}
                title='Toggle team edit mode'
              />
            )}
            <AccordionOpenToggle
              open={membersVisible}
              onChange={setMembersVisible}
              title='Toggle show team members'
            />
          </div>
        </div>
      </div>
      <div
        className={`collapsible-wrapper flex-col rounded-b-3xl ${
          membersVisible ? '' : 'collapsed'
        }`}
      >
        <div className='collapsible'>
          <div className='flex flex-col space-y-2 p-2 pt-1'>
            {isFetching ? (
              <TextLoading className='h-6' />
            ) : (
              <MemberList
                members={members}
                readOnly={editModeOff}
                team={team}
              />
            )}
          </div>
          {!editModeOff && (
            <div className='p-2 pt-0'>
              <AddTeamMember team={team} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Team
