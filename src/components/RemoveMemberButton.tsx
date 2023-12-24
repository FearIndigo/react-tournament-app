import { MemberDocument } from '../db/types'
import RemoveButton from './RemoveButton.tsx'

type RemoveMemberButtonProps = {
  member: MemberDocument
  title?: string
}

RemoveMemberButton.defaultProps = {
  title: 'Remove member',
}

function RemoveMemberButton({ member, title }: RemoveMemberButtonProps) {
  function removeMember() {
    member.remove()
  }

  return <RemoveButton title={title} onClick={removeMember} />
}

export default RemoveMemberButton
