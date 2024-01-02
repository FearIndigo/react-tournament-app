import {
  BracketDocument,
  GameDocument,
  MemberDocument,
  ScoreDocument,
  TeamDocument,
} from './types'
import { camel2Title } from '../helpers'

export async function getTeamName(team: TeamDocument) {
  if (!team) return ''

  if (team.name != '') return team.name

  const members: MemberDocument[] = await team.populate('members')

  return members.length > 0
    ? members.map((member) => member.name).join(' + ')
    : 'New Team'
}

export async function getGameName(game: GameDocument) {
  if (!game) return ''

  if (game.name != '') return game.name

  const scores: ScoreDocument[] = await game.populate('scores')
  const teamNames: string[] = []
  for (const score of scores) {
    const team: TeamDocument = await score.populate('team')
    if (team) {
      teamNames.push(await getTeamName(team))
    }
  }

  return teamNames.length > 0 ? teamNames.join(' vs ') : 'New Game'
}

export function getBracketName(bracket: BracketDocument) {
  if (!bracket) return ''

  if (bracket.name != '') return bracket.name

  return `${camel2Title(bracket.type)} Bracket`
}
