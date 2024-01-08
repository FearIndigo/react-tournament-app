import {
  useBrackets,
  useGames,
  useGamesTeamStats,
  useRounds,
} from '../db/hooks.ts'
import { TournamentDocument } from '../db/types.ts'
import StatsTable from './StatsTable.tsx'

type TournamentStatsProps = {
  tournament: TournamentDocument
  className?: string
}

TournamentStats.defaultProps = {
  className: '',
}

function TournamentStats({ tournament, className }: TournamentStatsProps) {
  const [brackets] = useBrackets(tournament.brackets)
  const [rounds] = useRounds(brackets.map((b) => b.rounds).flat())
  const [games] = useGames(rounds.map((r) => r.games).flat())
  const teamStats = useGamesTeamStats(games)

  return (
    <StatsTable
      name={tournament.name}
      teamStats={teamStats}
      className={className}
    />
  )
}

export default TournamentStats
