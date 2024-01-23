import TextInput from './TextInput.tsx'
import { MemberDocument, TeamDocument } from '../db/types'
import EditModeToggle from './EditModeToggle.tsx'
import RemoveTeamMemberButton from './RemoveTeamMemberButton.tsx'
import RemoveDocumentButton from './RemoveDocumentButton.tsx'
import { MemberDocType } from '../db/types/member'
import { usePropState } from '../hooks.tsx'
import Card from './Card.tsx'
import Slot from './Slot.tsx'

type MemberProps = {
  member: MemberDocument
  className?: string
  readOnly?: boolean
  showEditButton?: boolean
  team?: TeamDocument
}

Member.defaultProps = {
  className: '',
}

function Member({
  member,
  className,
  readOnly,
  showEditButton,
  team,
}: MemberProps) {
  const [editModeOff, setEditModeOff] = usePropState(readOnly ?? true)

  function updateName(name: string) {
    member.incrementalPatch({
      name: name,
    })
  }

  return (
    <Card className={`${className}`}>
      <Slot name='header'>
        <div className='flex h-full w-full items-center space-x-2 p-1'>
          {editModeOff ? (
            <span className='ml-2 w-full truncate'>{member.name}</span>
          ) : (
            <TextInput
              value={member.name}
              placeholder='Name...'
              onChange={updateName}
              className='w-full'
            />
          )}
          {(!editModeOff || showEditButton) && (
            <div className='flex h-full flex-row items-center space-x-1'>
              {!editModeOff &&
                (team ? (
                  <RemoveTeamMemberButton team={team} member={member} />
                ) : (
                  <RemoveDocumentButton<MemberDocType>
                    document={member}
                    title='Remove member'
                  />
                ))}
              {showEditButton && (
                <EditModeToggle
                  editModeOff={editModeOff}
                  onChange={setEditModeOff}
                  title='Toggle member edit mode'
                />
              )}
            </div>
          )}
        </div>
      </Slot>
    </Card>
  )
}

export default Member
