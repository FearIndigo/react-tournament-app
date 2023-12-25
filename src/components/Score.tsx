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
  const teamName = useTeamName(teams[0])

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

  const team = teams[0]
  const bestScore = scores.length > 0 ? scores[0].score : -1
  const isBestScore = bestScore == score.score

  return (
    <div className='flex w-full items-center space-x-1'>
      {editModeOff ? (
        <>
          <div className='flex h-10 items-center self-start'>
            <span
              className={`flex h-8 w-14 items-center justify-center truncate rounded-3xl p-2 font-bold ${
                isBestScore ? 'bg-green-300 text-green-800' : 'bg-blue-300'
              }`}
            >
              {score.score}
            </span>
          </div>
          <div className='grow truncate'>
            <Team team={team} />
          </div>
        </>
      ) : (
        <>
          <div>
            <NumberInput
              value={score.score}
              placeholder='Name...'
              onChange={updateScore}
              className='w-14 text-center'
              min={0}
            />
          </div>

          <span className='w-full truncate p-2 font-bold'>{teamName}</span>
          <div>
            <RemoveScoreButton score={score} />
          </div>
        </>
      )}
    </div>
  )
}

export default Score
