import MemberList from './MemberList.tsx'
import { ReactNode, useEffect, useState } from 'react'
import TextInput from './TextInput.tsx'
import { TeamDocument } from '../db/types'
import { useRxData } from 'rxdb-hooks'
import { MemberDocType } from '../db/types/member'
import TextLoading from './TextLoading.tsx'
import EditModeToggle from './EditModeToggle.tsx'
import AccordionOpenToggle from './AccordionOpenToggle.tsx'
import AddTeamMember from './AddTeamMember.tsx'
import { useTeamName } from '../db/hooks'
import { useSlots } from '../hooks.tsx'
import RemoveDocumentButton from './RemoveDocumentButton.tsx'
import { TeamDocType } from '../db/types/team'

type TeamProps = {
  team: TeamDocument
  showMembers?: boolean
  readOnly?: boolean
  className?: string
  showEditButton?: boolean
  children?: ReactNode
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
  children,
}: TeamProps) {
  const slots = useSlots(children)
  const [membersVisible, setMembersVisible] = useState(showMembers)
  const [editModeOff, setEditModeOff] = useState(readOnly)
  const { result: members, isFetching } = useRxData<MemberDocType>(
    'members',
    (collection) =>
      collection.find({
        selector: {
          id: { $in: team.members },
        },
        index: ['createdAt'],
      })
  )
  const teamName = useTeamName(team)

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

  return (
    <div
      className={`flex flex-col rounded-3xl bg-blue-100 text-blue-800 ${className}`}
    >
      <div className='h-10 rounded-3xl bg-blue-300 p-1'>
        <div className='flex h-full items-center justify-between space-x-1'>
          {editModeOff ? (
            <>
              {slots.preHeader && (
                <div className='h-full'>{slots.preHeader}</div>
              )}
              <span className='w-full truncate rounded-3xl p-2 font-bold'>
                {teamName}
              </span>
            </>
          ) : (
            <TextInput
              value={team.name}
              placeholder={teamName ?? 'Name...'}
              onChange={updateName}
              className='font-bold'
            />
          )}
          <div className='flex h-full space-x-1'>
            {slots.postHeader}
            {!editModeOff && (
              <RemoveDocumentButton<TeamDocType>
                document={team}
                title='Remove team'
              />
            )}
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
          <div className='p-2 pt-1'>
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
