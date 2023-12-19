import MemberList from './MemberList.tsx';

type TeamProps = {
  teamId: number;
  showMembers: boolean;
  readOnly: boolean;
};

function Member({ teamId, showMembers, readOnly }: TeamProps) {
  // TODO fetch team data from store
  return (
    <div className="flex flex-col">
      <h3>Team Name</h3>
      {showMembers && <MemberList members={[0, 1, 2]} readOnly={readOnly} />}
    </div>
  );
}

export default Member;
