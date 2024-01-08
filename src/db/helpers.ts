import {
  BracketDocument,
  GameDocument,
  GameTypes,
  MemberDocument,
  RoundDocument,
  ScoreDocument,
  TeamDocument,
  TournamentDocument,
} from './types'
import { camel2Title } from '../helpers'
import { TeamStats } from '../types.ts'

export async function getTeamName(team: TeamDocument) {
  if (!team) return ''

  if (team.name != '') return team.name

  const members: MemberDocument[] = await team.populate('members')

  return members.length > 0
    ? members.map((member) => member.name).join(' + ')
    : 'New Team'
}

export async function getTeamNames(teams: TeamDocument[]) {
  if (!teams || teams.length == 0) return {}

  const teamNames: Record<string, string> = {}
  for (const team of teams) {
    teamNames[team.id] = await getTeamName(team)
  }

  return teamNames
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

  const scoreTeams: Record<number, string[]> = {}
  for (const score of scores) {
    if (!scoreTeams[score.score]) scoreTeams[score.score] = []
    scoreTeams[score.score].push(score.team)
  }

  const scoreValues = scores.map((score) => score.score)

  switch (game.type) {
    default:
    case GameTypes.HighestScore:
      return scoreTeams[scoreValues.sort((a, b) => b - a)[0]]
    case GameTypes.LowestScore:
      return scoreTeams[scoreValues.sort((a, b) => a - b)[0]]
  }
}

export async function getGameTeamStats(game: GameDocument) {
  if (!game) return {}

  const scores: ScoreDocument[] = await game.populate('scores')

  if (scores.length == 0) return {}

  const winningTeamIds = await getWinningTeamIds(game)

  const dict: Record<string, TeamStats> = {}
  for (const score of scores) {
    const stats = new TeamStats()
    if (game.completed) {
      if (winningTeamIds.includes(score.team)) {
        if (winningTeamIds.length == 1) {
          stats.wins = 1
        } else {
          stats.draws = 1
        }
      } else {
        stats.loses = 1
      }
    }
    dict[score.team] = stats
  }

  return dict
}

export async function getRoundTeamStats(round: RoundDocument) {
  if (!round) return {}

  const games: GameDocument[] = await round.populate('games')

  let dict: Record<string, TeamStats> = {}
  for (const game of games) {
    dict = combineTeamStats(dict, await getGameTeamStats(game))
  }

  return dict
}

export async function getBracketTeamStats(bracket: BracketDocument) {
  if (!bracket) return {}

  const rounds: RoundDocument[] = await bracket.populate('rounds')

  let dict: Record<string, TeamStats> = {}
  for (const round of rounds) {
    const roundStats = await getRoundTeamStats(round)
    dict = combineTeamStats(dict, roundStats)
  }

  return dict
}

export async function getTournamentTeamStats(tournament: TournamentDocument) {
  if (!tournament) return {}

  const brackets: BracketDocument[] = await tournament.populate('brackets')

  let dict: Record<string, TeamStats> = {}
  for (const bracket of brackets) {
    const bracketStats = await getBracketTeamStats(bracket)
    dict = combineTeamStats(dict, bracketStats)
  }

  return dict
}

export function combineTeamStats(...allTeamStats: Record<string, TeamStats>[]) {
  const combined: Record<string, TeamStats> = {}
  for (const teamStats of allTeamStats) {
    for (const teamId of Object.keys(teamStats)) {
      if (!combined[teamId]) combined[teamId] = new TeamStats()
      combined[teamId].add(teamStats[teamId])
    }
  }

  return combined
}
