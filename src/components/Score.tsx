import { ScoreDocument } from '../db/types'
import { useEffect, useState } from 'react'
import RemoveScoreButton from './RemoveScoreButton'
import { useRxData } from 'rxdb-hooks'
import { TeamDocType } from '../db/types/team'
import Team from './Team.tsx'
import TextLoading from './TextLoading'
import NumberInput from './NumberInput'

type ScoreProps = {
  score: ScoreDocument
  readOnly?: boolean
}

Score.defaultProps = {
  readOnly: true,
}

function Score({ score, readOnly }: ScoreProps) {
  const [editModeOff, setEditModeOff] = useState(readOnly)
  const { result: teams, isFetching } = useRxData<TeamDocType>(
    'teams',
    (collection) =>
      collection.find({
        selector: {
          id: score.team,
        },
      })
  )

  useEffect(() => {
    setEditModeOff(readOnly)
  }, [readOnly])

  if (isFetching) {
    return <TextLoading className='h-6' />
  }
  function updateScore(newScore: number) {
    score.incrementalPatch({
      score: newScore,
    })
  }

  const team = teams[0]

  return (
    <div className='flex w-full items-center space-x-1'>
      {editModeOff ? (
        <>
          <div className='grow truncate'>
            <Team team={team} />
          </div>
          <div className='self-start'>
            <span className='flex h-10 w-14 items-center justify-center truncate rounded-3xl bg-blue-300 p-2'>
              {score.score}
            </span>
          </div>
        </>
      ) : (
        <>
          <span className='w-full truncate p-2 font-bold'>{team.name}</span>
          <NumberInput
            value={score.score}
            placeholder='Name...'
            onChange={updateScore}
            className='w-24 text-center'
            min={0}
          />
          <div>
            <RemoveScoreButton score={score} />
          </div>
        </>
      )}
    </div>
  )
}

export default Score
