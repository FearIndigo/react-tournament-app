import { GameDocument, TeamDocument } from './types'
import { useEffect, useState } from 'react'
import { getGameName, getTeamName, getTeamPoints } from './helpers'
import { useRxData } from 'rxdb-hooks'
import { TeamDocType } from './types/team'
import { ScoreDocType } from './types/score'

export function useTeamName(team: TeamDocument) {
  const [teamName, setTeamName] = useState('')

  useEffect(() => {
    getTeamName(team).then(setTeamName)
  }, [team])

  return teamName
}

export function useGameName(game: GameDocument) {
  const [gameName, setGameName] = useState('')
  const { result: scores } = useRxData<ScoreDocType>('scores', (collection) =>
    collection.find({
      selector: {
        id: { $in: game.scores },
      },
    })
  )
  const { result: teams } = useRxData<TeamDocType>('teams', (collection) =>
    collection.find({
      selector: {
        id: { $in: scores.map((score) => score.team) },
      },
    })
  )

  useEffect(() => {
    getGameName(game).then(setGameName)
  }, [game, teams])

  return gameName
}

export function useTeamPoints(game: GameDocument) {
  const [teamPoints, setTeamPoints] = useState<Record<string, number>>({})
  // Need to populate game.scores as the field that determines winner exists on score document
  const { result: scores } = useRxData<ScoreDocType>('scores', (collection) =>
    collection.find({
      selector: {
        id: { $in: game.scores },
      },
    })
  )

  useEffect(() => {
    getTeamPoints(game).then(setTeamPoints)
  }, [game, scores])

  return teamPoints
}
