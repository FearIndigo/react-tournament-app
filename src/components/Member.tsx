import TextInput from './TextInput.tsx'
import { MemberDocument } from '../db/types/types'

type MemberProps = {
  member: MemberDocument
  readOnly?: boolean
  showEditButton?: boolean
}

Member.defaultProps = {
  readOnly: true,
}

function Member({ member, readOnly, showEditButton }: MemberProps) {
  function updateName(name: string) {
    member.incrementalPatch({
      name: name,
    })
  }

  return readOnly ? (
    <div className='flex h-8 items-center rounded-3xl bg-blue-100 p-2'>
      <span className='truncate'>{member.name}</span>
    </div>
  ) : (
    <TextInput
      value={member.name}
      placeholder='Name...'
      onChange={updateName}
      className='h-8'
    />
  )
}

export default Member
