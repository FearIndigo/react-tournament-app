import { MemberDocument, TeamDocument } from './types'

export async function getTeamName(team: TeamDocument) {
  if (!team) return '...'

  const members: MemberDocument[] = await team.populate('members')

  return team.name != ''
    ? team.name
    : members.length > 0
      ? members.map((member) => member.name).join(' + ')
      : 'New Team'
}
