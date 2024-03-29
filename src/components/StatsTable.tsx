import { useTeamNames, useTeams } from '../db/hooks.ts'
import { useMemo } from 'react'
import TextInfo from './TextInfo.tsx'
import Slot from './Slot.tsx'
import Card from './Card.tsx'
import { TeamStats } from '../types.ts'

type StatsTableProps = {
  teamStats: Record<string, TeamStats>
  name: string
  className?: string
}

StatsTable.defaultProps = {
  className: '',
}

function StatsTable({ teamStats, name, className }: StatsTableProps) {
  const [teams] = useTeams(Object.keys(teamStats))
  const teamNames = useTeamNames(teams)

  const sortedTeamIds = useMemo(
    () =>
      Object.keys(teamStats).sort(
        (team0Id, team1Id) =>
          teamStats[team1Id].points() - teamStats[team0Id].points()
      ),
    [teamStats]
  )

  return (
    <Card className={`bg-100 ${className}`}>
      <Slot name='header'>
        <div className='flex h-full w-full items-center justify-center p-1'>
          <span className='px-2 font-bold'>{name} Stats</span>
        </div>
      </Slot>
      <Slot name='content'>
        <div className='p-3 pt-2'>
          {sortedTeamIds.length == 0 ? (
            <TextInfo text='No stats found' className='h-8' />
          ) : (
            <table className='w-full table-fixed'>
              <thead>
                <tr className='h-10'>
                  <th className='w-1/3'></th>
                  <th
                    title='Wins'
                    className='rounded-3xl bg-green-300 text-green-800'
                  >
                    W
                  </th>
                  <th
                    title='Loses'
                    className='rounded-3xl bg-red-200 text-red-800'
                  >
                    L
                  </th>
                  <th
                    title='Draws'
                    className='rounded-3xl bg-sky-200 text-sky-800'
                  >
                    D
                  </th>
                  <th title='Played'>P</th>
                  <th
                    title='Points'
                    className='rounded-3xl bg-yellow-200 text-yellow-800'
                  >
                    Pts
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedTeamIds.map((teamId) => (
                  <tr
                    key={teamId}
                    className='hover:bg-300 text-center transition-colors odd:bg-violet-950/[0.03]'
                  >
                    <td className='truncate rounded-l-3xl pl-3 text-left'>
                      {teamNames[teamId]}
                    </td>
                    <td>{teamStats[teamId].wins}</td>
                    <td>{teamStats[teamId].loses}</td>
                    <td>{teamStats[teamId].draws}</td>
                    <td>{teamStats[teamId].gamesPlayed()}</td>
                    <td className='rounded-r-3xl'>
                      {teamStats[teamId].points()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Slot>
    </Card>
  )
}

export default StatsTable
