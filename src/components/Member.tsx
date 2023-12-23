import TextInput from './TextInput.tsx'
import { MemberDocument, TeamDocument } from '../db/types/types'
import { useEffect, useState } from 'react'
import EditModeToggle from './EditModeToggle.tsx'
import RemoveTeamMemberButton from './RemoveTeamMemberButton.tsx'
import RemoveMemberButton from './RemoveMemberButton.tsx'

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
    <div className='flex h-8 items-center space-x-1'>
      {editModeOff ? (
        <div className='flex h-full grow items-center rounded-3xl bg-blue-100 p-2'>
          <span className='truncate'>{member.name}</span>
        </div>
      ) : (
        <TextInput
          value={member.name}
          placeholder='Name...'
          onChange={updateName}
        />
      )}
      <div className='flex h-full flex-row items-center space-x-1'>
        {!editModeOff &&
          (team ? (
            <RemoveTeamMemberButton team={team} member={member} />
          ) : (
            <RemoveMemberButton member={member} />
          ))}
        {showEditButton && (
          <EditModeToggle
            readOnly={readOnly}
            onChange={setEditModeOff}
            title='Toggle member edit mode'
          />
        )}
      </div>
    </div>
  )
}

export default Member
