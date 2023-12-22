import Member from './Member.tsx'

type MemberListProps = {
  members: string[]
  readOnly?: boolean
}

function MemberList({ members, readOnly }: MemberListProps) {
  return (
    <div className='flex flex-col space-y-1 p-3'>
      {members.map((memberId) => (
        <Member key={memberId} memberId={memberId} readOnly={readOnly} />
      ))}
    </div>
  )
}

export default MemberList
