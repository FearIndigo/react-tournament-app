type MemberProps = {
  memberId: number;
  readOnly: boolean;
};

function Member({ memberId, readOnly }: MemberProps) {
  // TODO fetch member data from store
  return <span>Member Name</span>;
}

export default Member;
