import TextInput from './TextInput.tsx'
import { MemberDocument, TeamDocument } from '../db/types'
import EditModeToggle from './EditModeToggle.tsx'
import RemoveTeamMemberButton from './RemoveTeamMemberButton.tsx'
import RemoveDocumentButton from './RemoveDocumentButton.tsx'
import { MemberDocType } from '../db/types/member'
import { usePropState } from '../hooks.tsx'

type MemberProps = {
  member: MemberDocument
  readOnly?: boolean
  showEditButton?: boolean
  team?: TeamDocument
}

function Member({ member, readOnly, showEditButton, team }: MemberProps) {
  const [editModeOff, setEditModeOff] = usePropState(readOnly ?? true)

  function updateName(name: string) {
    member.incrementalPatch({
      name: name,
    })
  }

  return (
    <div className='bg-300 flex h-10 items-center space-x-1 rounded-3xl p-1'>
      {editModeOff ? (
        <div className='flex h-full grow items-center truncate p-2'>
          <span className='truncate'>{member.name}</span>
        </div>
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
  )
}

export default Member
