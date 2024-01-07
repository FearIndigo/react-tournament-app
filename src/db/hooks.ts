import { GameDocument, TeamDocument } from './types'
import { useEffect, useState } from 'react'
import { getGameName, getGameTeamStats, getTeamName } from './helpers'
import { useRxData } from 'rxdb-hooks'
import { TeamDocType } from './types/team'
import { ScoreDocType } from './types/score'
import { TeamStats } from '../types.ts'
import { BracketDocType } from './types/bracket'
import { RoundDocType } from './types/round'
import { GameDocType } from './types/game'
import { MemberDocType } from './types/member'
import { TournamentDocType } from './types/tournament'

export function useTeamName(team: TeamDocument) {
  const [teamName, setTeamName] = useState('')

  useEffect(() => {
    getTeamName(team).then(setTeamName)
  }, [team])

  return teamName
}

export function useGameName(game: GameDocument) {
  const [gameName, setGameName] = useState('')
  const [scores] = useScores(game.scores)
  const [teams] = useTeams(scores.map((score) => score.team))

  useEffect(() => {
    getGameName(game).then(setGameName)
  }, [game, teams])

  return gameName
}

export function useGameTeamStats(game: GameDocument) {
  const [teamStats, setTeamStats] = useState<Record<string, TeamStats>>({})
  // Need to populate game.scores as the field that determines winner exists on score document
  const [scores] = useScores(game.scores)

  useEffect(() => {
    getGameTeamStats(game).then(setTeamStats)
  }, [game, scores])

  return teamStats
}

export function useTournaments(ids: string[]) {
  const { result, isFetching } = useRxData<TournamentDocType>(
    'tournaments',
    (collection) =>
      collection.find({
        selector: {
          id: { $in: ids },
        },
        index: ['createdAt'],
      })
  )

  return [result, isFetching] as const
}

export function useBrackets(ids: string[]) {
  const { result, isFetching } = useRxData<BracketDocType>(
    'brackets',
    (collection) =>
      collection.find({
        selector: {
          id: { $in: ids },
        },
        index: ['createdAt'],
      })
  )

  return [result, isFetching] as const
}

export function useRounds(ids: string[]) {
  const { result, isFetching } = useRxData<RoundDocType>(
    'rounds',
    (collection) =>
      collection.find({
        selector: {
          id: { $in: ids },
        },
        index: ['createdAt'],
      })
  )

  return [result, isFetching] as const
}

export function useGames(ids: string[]) {
  const { result, isFetching } = useRxData<GameDocType>('games', (collection) =>
    collection.find({
      selector: {
        id: { $in: ids },
      },
      index: ['createdAt'],
    })
  )

  return [result, isFetching] as const
}

export function useScores(ids: string[]) {
  const { result, isFetching } = useRxData<ScoreDocType>(
    'scores',
    (collection) =>
      collection.find({
        selector: {
          id: { $in: ids },
        },
        index: ['createdAt'],
      })
  )

  return [result, isFetching] as const
}

export function useTeams(ids: string[]) {
  const { result, isFetching } = useRxData<TeamDocType>('teams', (collection) =>
    collection.find({
      selector: {
        id: { $in: ids },
      },
      index: ['createdAt'],
    })
  )

  return [result, isFetching] as const
}

export function useMembers(ids: string[]) {
  const { result, isFetching } = useRxData<MemberDocType>(
    'members',
    (collection) =>
      collection.find({
        selector: {
          id: { $in: ids },
        },
        index: ['createdAt'],
      })
  )

  return [result, isFetching] as const
}
