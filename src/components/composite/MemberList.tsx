import Member from '../element/Member.tsx';

type MemberListProps = {
  members: number[];
  readOnly: boolean;
};

function MemberList({ members, readOnly }: MemberListProps) {
  const content = members.map((memberId) => (
    <Member key={memberId} memberId={memberId} readOnly={readOnly} />
  ));
  return <div className="flex flex-col">{content}</div>;
}

export default MemberList;
