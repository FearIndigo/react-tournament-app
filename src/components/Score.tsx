import { GameDocument, ScoreDocument } from '../db/types'
import { useEffect, useState } from 'react'
import RemoveScoreButton from './RemoveScoreButton'
import { useRxData } from 'rxdb-hooks'
import { TeamDocType } from '../db/types/team'
import Team from './Team.tsx'
import TextLoading from './TextLoading'
import NumberInput from './NumberInput'
import { ScoreDocType } from '../db/types/score'
import { useTeamName } from '../db/hooks'
import TextError from './TextError'

type ScoreProps = {
  score: ScoreDocument
  game?: GameDocument
  readOnly?: boolean
}

Score.defaultProps = {
  readOnly: true,
}

function Score({ score, game, readOnly }: ScoreProps) {
  const [editModeOff, setEditModeOff] = useState(readOnly)
  const { result: teams, isFetching: fetchingTeams } = useRxData<TeamDocType>(
    'teams',
    (collection) =>
      collection.find({
        selector: {
          id: score.team,
        },
      })
  )
  const { result: scores, isFetching: fetchingScores } =
    useRxData<ScoreDocType>('scores', (collection) =>
      collection.find({
        selector: {
          id: { $in: game?.scores },
        },
        sort: [{ score: 'desc' }],
      })
    )
  const team = teams[0]
  const teamName = useTeamName(team)

  useEffect(() => {
    setEditModeOff(readOnly)
  }, [readOnly])

  if (fetchingTeams || fetchingScores) {
    return <TextLoading className='h-6' />
  }
  function updateScore(newScore: number) {
    score.incrementalPatch({
      score: newScore,
    })
  }

  let isWinningScore = false
  switch (game?.type) {
    case 'highestScore':
      isWinningScore = score.score == scores[0]?.score
      break
    case 'lowestScore':
      isWinningScore = score.score == scores[scores.length - 1]?.score
      break
  }

  return (
    <div className='flex w-full items-center'>
      {editModeOff ? (
        <div className='grow truncate'>
          {team ? (
            <Team team={team}>
              <span
                className={`flex h-full w-12 items-center justify-center truncate rounded-3xl font-bold ${
                  isWinningScore
                    ? 'bg-green-300 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {score.score}
              </span>
            </Team>
          ) : (
            <TextError text='missing team!' className='h-8' />
          )}
        </div>
      ) : (
        <div className='flex w-full items-center space-x-1 rounded-3xl bg-blue-300 p-1'>
          <div>
            <NumberInput
              value={score.score}
              placeholder='Score...'
              onChange={updateScore}
              className='w-16'
            />
          </div>
          <div className='grow truncate'>
            {team ? (
              <span className='w-full truncate px-2 font-bold'>{teamName}</span>
            ) : (
              <TextError text='missing!' className='h-8' />
            )}
          </div>
          <div>
            <RemoveScoreButton title='Remove team from game' score={score} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Score
