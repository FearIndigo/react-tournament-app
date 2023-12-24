import TextInput from './TextInput.tsx'
import { ScoreDocument } from '../db/types'
import { useEffect, useState } from 'react'
import RemoveScoreButton from './RemoveScoreButton'
import { useRxData } from 'rxdb-hooks'
import { TeamDocType } from '../db/types/team'
import Team from './Team.tsx'
import TextLoading from './TextLoading'

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
  function updateScore(newScore: string) {
    score.incrementalPatch({
      score: parseInt(newScore),
    })
  }

  const team = teams[0]

  return (
    <div className='flex w-full items-center space-x-1'>
      {editModeOff ? (
        <div className='flex w-full items-center space-x-1'>
          {/*TODO figure out how to prevent breaking out of parent*/}
          <Team team={team} className='grow' />
          <span className='flex h-10 w-14 items-center justify-center self-start truncate rounded-3xl bg-blue-300 p-2'>
            {score.score}
          </span>
        </div>
      ) : (
        <div className='flex grow items-center space-x-1'>
          <span className='w-full truncate p-2 font-bold'>{team.name}</span>
          <TextInput
            value={score.score.toString()}
            placeholder='Name...'
            onChange={updateScore}
            className='w-14 text-center'
          />
        </div>
      )}
      {!editModeOff && <RemoveScoreButton score={score} />}
    </div>
  )
}

export default Score
