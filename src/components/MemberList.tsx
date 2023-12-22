import Member from './Member.tsx'
import { MemberDocument } from '../db/types/types'

type MemberListProps = {
  members: MemberDocument[]
  className?: string
  readOnly?: boolean
  showEditButton?: boolean
}

MemberList.defaultProps = {
  readOnly: true,
  className: '',
}

function MemberList({
  members,
  className,
  readOnly,
  showEditButton,
}: MemberListProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {members.map((member) => (
        <Member
          key={member.id}
          member={member}
          readOnly={readOnly}
          showEditButton={showEditButton}
        />
      ))}
    </div>
  )
}

export default MemberList
