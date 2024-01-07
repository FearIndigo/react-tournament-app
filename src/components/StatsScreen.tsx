import { useRxData } from 'rxdb-hooks'
import { TournamentDocType } from '../db/types/tournament'
import {
  useBrackets,
  useGames,
  useGamesTeamStats,
  useRounds,
  useTeams,
} from '../db/hooks.ts'
import SelectInput from './SelectInput.tsx'
import { Fragment, useMemo, useState } from 'react'

type StatsScreenProps = {
  className?: string
}

StatsScreen.defaultProps = {
  className: '',
}

function StatsScreen({ className }: StatsScreenProps) {
  const [selectedTournament, setSelectedTournament] = useState<
    [id: string, name: string]
  >(['', ''])
  const { result: tournaments } = useRxData<TournamentDocType>(
    'tournaments',
    (collection) =>
      collection.find({
        index: ['createdAt'],
      })
  )
  const [brackets] = useBrackets(
    tournaments.find((t) => t.id == selectedTournament[0])?.brackets ?? []
  )
  const [rounds] = useRounds(brackets.map((b) => b.rounds).flat())
  const [games] = useGames(rounds.map((r) => r.games).flat())
  const teamStats = useGamesTeamStats(games)
  const [teams] = useTeams(Object.keys(teamStats))

  const options: [id: string, name: string][] = useMemo(
    () => tournaments.map((t) => [t.id, t.name]),
    [tournaments]
  )

  return (
    <div
      className={`container my-4 flex flex-col justify-center px-4 ${className}`}
    >
      <SelectInput
        onChange={setSelectedTournament}
        options={options}
        value={selectedTournament[0]}
      />
      {teams.map((t) => (
        <Fragment key={t.id}>
          <span>{t.id}:</span>
          <span>{teamStats[t.id].toString()}</span>
        </Fragment>
      ))}
    </div>
  )
}

export default StatsScreen
