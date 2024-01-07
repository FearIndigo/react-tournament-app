import { useRxData } from 'rxdb-hooks'
import { TournamentDocType } from '../db/types/tournament'
import {
  useBrackets,
  useGames,
  useGamesTeamStats,
  useRounds,
  useTeams,
} from '../db/hooks.ts'

function StatsScreen() {
  const { result: tournaments } = useRxData<TournamentDocType>(
    'tournaments',
    (collection) =>
      collection.find({
        index: ['createdAt'],
      })
  )
  const [brackets] = useBrackets(tournaments.map((t) => t.brackets).flat())
  const [rounds] = useRounds(brackets.map((b) => b.rounds).flat())
  const [games] = useGames(rounds.map((r) => r.games).flat())
  const teamStats = useGamesTeamStats(games)
  const [teams] = useTeams(Object.keys(teamStats))

  return (
    <div className='container my-4 flex flex-col justify-center px-4'>
      {teams.map((t) => (
        <span key={t.id}>
          {t.id}: {teamStats[t.id].toString()}
        </span>
      ))}
    </div>
  )
}

export default StatsScreen
