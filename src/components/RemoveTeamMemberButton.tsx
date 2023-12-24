import { MemberDocument, TeamDocument } from '../db/types'
import RemoveButton from './RemoveButton.tsx'

type RemoveTeamMemberButtonProps = {
  team: TeamDocument
  member: MemberDocument
  title?: string
}

RemoveTeamMemberButton.defaultProps = {
  title: 'Remove team member',
}

function RemoveTeamMemberButton({
  team,
  member,
  title,
}: RemoveTeamMemberButtonProps) {
  function removeTeamMember() {
    team.incrementalPatch({
      members: team.members.filter((teamMemberId) => teamMemberId != member.id),
    })
  }

  return <RemoveButton title={title} onClick={removeTeamMember} />
}

export default RemoveTeamMemberButton
