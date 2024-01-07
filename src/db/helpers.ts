import {
  BracketDocument,
  GameDocument,
  GameTypes,
  MemberDocument,
  RoundDocument,
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

export function getRoundName(
  round: RoundDocument,
  bracket: BracketDocument | undefined
) {
  if (!round) return ''

  if (round.name != '') return round.name

  if (!bracket) return 'New Round'

  const roundIndex = bracket.rounds.indexOf(round.id)

  return roundIndex != -1 ? `Round ${roundIndex + 1}` : 'New Round'
}

export async function getWinningTeamIds(game: GameDocument) {
  if (!game) return []

  const scores: ScoreDocument[] = await game.populate('scores')

  if (scores.length == 0) return []

  const scoreTeams = scores.reduce((dict: Record<number, string[]>, score) => {
    if (!dict[score.score]) dict[score.score] = []
    dict[score.score].push(score.team)
    return dict
  }, {})

  const scoreValues = scores.map((score) => score.score)

  switch (game.type) {
    default:
    case GameTypes.HighestScore:
      return scoreTeams[scoreValues.sort((a, b) => b - a)[0]]
    case GameTypes.LowestScore:
      return scoreTeams[scoreValues.sort((a, b) => a - b)[0]]
  }
}

export async function getTeamPoints(game: GameDocument) {
  if (!game) return {}

  const winningTeamIds = await getWinningTeamIds(game)

  const scores: ScoreDocument[] = await game.populate('scores')

  if (scores.length == 0) return {}

  return scores.reduce((dict: Record<string, number>, score) => {
    dict[score.team] = winningTeamIds.includes(score.team)
      ? winningTeamIds.length == 1
        ? 3
        : 1
      : 0
    return dict
  }, {})
}
