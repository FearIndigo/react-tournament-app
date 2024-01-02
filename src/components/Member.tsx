import TextInput from './TextInput.tsx'
import { MemberDocument, TeamDocument } from '../db/types'
import { useEffect, useState } from 'react'
import EditModeToggle from './EditModeToggle.tsx'
import RemoveTeamMemberButton from './RemoveTeamMemberButton.tsx'
import RemoveDocumentButton from './RemoveDocumentButton.tsx'
import { MemberDocType } from '../db/types/member'

type MemberProps = {
  member: MemberDocument
  readOnly?: boolean
  showEditButton?: boolean
  team?: TeamDocument
}

Member.defaultProps = {
  readOnly: true,
}

function Member({ member, readOnly, showEditButton, team }: MemberProps) {
  const [editModeOff, setEditModeOff] = useState(readOnly)

  useEffect(() => {
    setEditModeOff(readOnly)
  }, [readOnly])

  function updateName(name: string) {
    member.incrementalPatch({
      name: name,
    })
  }

  return (
    <div className='flex h-10 items-center space-x-1 rounded-3xl bg-blue-300 p-1'>
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
              readOnly={readOnly}
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
