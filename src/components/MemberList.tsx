import Member from './Member.tsx'
import { MemberDocument, TeamDocument } from '../db/types'

type MemberListProps = {
  members: MemberDocument[]
  className?: string
  readOnly?: boolean
  team?: TeamDocument
  showEditButton?: boolean
}

MemberList.defaultProps = {
  className: '',
}

function MemberList({
  members,
  className,
  readOnly,
  team,
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
          team={team}
        />
      ))}
    </div>
  )
}

export default MemberList
