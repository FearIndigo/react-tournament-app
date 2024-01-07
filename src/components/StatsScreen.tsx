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
import { useMemo, useState } from 'react'

function StatsScreen() {
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
    <div className='container my-4 flex flex-col justify-center px-4'>
      <SelectInput
        onChange={setSelectedTournament}
        options={options}
        value={selectedTournament[0]}
      />
      {teams.map((t) => (
        <span key={t.id}>
          {t.id}: {teamStats[t.id].toString()}
        </span>
      ))}
    </div>
  )
}

export default StatsScreen
