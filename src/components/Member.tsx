import TextInput from './TextInput.tsx'
import { MemberDocument } from '../db/types/types'
import { useEffect, useState } from 'react'
import EditModeToggle from './EditModeToggle.tsx'

type MemberProps = {
  member: MemberDocument
  readOnly?: boolean
  showEditButton?: boolean
}

Member.defaultProps = {
  readOnly: true,
}

function Member({ member, readOnly, showEditButton }: MemberProps) {
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
          className='h-full'
        />
      )}
      {showEditButton && (
        <EditModeToggle readOnly={readOnly} onChange={setEditModeOff} />
      )}
    </div>
  )
}

export default Member
