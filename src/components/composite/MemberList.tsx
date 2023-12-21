import Member from '../element/Member.tsx'

type MemberListProps = {
  members: number[]
  readOnly: boolean
}

function MemberList({ members, readOnly }: MemberListProps) {
  return (
    <div className='flex flex-col'>
      {members.map((memberId) => (
        <Member key={memberId} memberId={memberId} readOnly={readOnly} />
      ))}
    </div>
  )
}

export default MemberList
