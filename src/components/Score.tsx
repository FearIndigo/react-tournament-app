import { GameDocument, ScoreDocument } from '../db/types'
import { KeyboardEvent } from 'react'
import { useRxData } from 'rxdb-hooks'
import { TeamDocType } from '../db/types/team'
import Team from './Team.tsx'
import TextLoading from './TextLoading'
import NumberInput from './NumberInput'
import { ScoreDocType } from '../db/types/score'
import TextError from './TextError'
import Slot from './Slot.tsx'
import RemoveDocumentButton from './RemoveDocumentButton.tsx'
import { useTeamPoints } from '../db/hooks.ts'
import { usePropState } from '../hooks.tsx'

type ScoreProps = {
  score: ScoreDocument
  game: GameDocument
  readOnly?: boolean
  showRemoveButton?: boolean
}

function Score({ score, game, readOnly, showRemoveButton }: ScoreProps) {
  const [editModeOff, setEditModeOff] = usePropState(readOnly)
  const { result: teams, isFetching } = useRxData<TeamDocType>(
    'teams',
    (collection) =>
      collection.find({
        selector: {
          id: score.team,
        },
      })
  )
  const team = teams[0]
  const teamPoints = useTeamPoints(game)[score.team]

  if (isFetching) {
    return <TextLoading className='h-6' />
  }
  function updateScore(newScore: number) {
    score.incrementalPatch({
      score: newScore,
    })
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key != 'Enter') return
    handleSubmit()
  }

  function handleSubmit() {
    if (!readOnly) return
    setEditModeOff(true)
  }

  return (
    <div className='flex w-full items-center'>
      <div className='w-full'>
        {team ? (
          <Team team={team}>
            <Slot name='preHeader'>
              {editModeOff ? (
                <span
                  onClick={() => setEditModeOff(false)}
                  className={`flex h-full w-12 cursor-pointer items-center justify-center truncate rounded-3xl font-bold shadow ${
                    teamPoints == 3
                      ? 'bg-green-300 text-green-800'
                      : teamPoints == 1
                        ? 'bg-100'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {score.score}
                </span>
              ) : (
                <NumberInput
                  value={score.score}
                  placeholder='Score...'
                  onChange={updateScore}
                  className='w-16'
                  onKeyDown={handleKeyDown}
                  onBlur={handleSubmit}
                  focused={readOnly}
                />
              )}
            </Slot>
            <Slot name='postHeader'>
              {!editModeOff && showRemoveButton && (
                <RemoveDocumentButton<ScoreDocType>
                  title='Remove team from game'
                  document={score}
                />
              )}
            </Slot>
          </Team>
        ) : (
          <div className='bg-300 flex h-10 items-center rounded-3xl p-1'>
            <TextError text='missing team!' className='h-full w-full' />
            <RemoveDocumentButton<ScoreDocType>
              title='Remove team from game'
              document={score}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Score
