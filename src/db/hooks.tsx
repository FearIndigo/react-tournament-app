import { TeamDocument } from './types'
import { useEffect, useState } from 'react'
import { getTeamName } from './helpers.tsx'

export function useTeamName(team: TeamDocument) {
  const [teamName, setTeamName] = useState('...')

  useEffect(() => {
    getTeamName(team).then(setTeamName)
  }, [team])

  return teamName
}
