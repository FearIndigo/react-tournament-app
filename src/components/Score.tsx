import { GameDocument, ScoreDocument } from '../db/types'
import { KeyboardEvent } from 'react'
import Team from './Team.tsx'
import TextLoading from './TextLoading'
import NumberInput from './NumberInput'
import { ScoreDocType } from '../db/types/score'
import TextError from './TextError'
import Slot from './Slot.tsx'
import RemoveDocumentButton from './RemoveDocumentButton.tsx'
import { useGameTeamStats, useTeams } from '../db/hooks.ts'
import { usePropState } from '../hooks.tsx'

type ScoreProps = {
  score: ScoreDocument
  game: GameDocument
  readOnly?: boolean
  showRemoveButton?: boolean
}

function Score({ score, game, readOnly, showRemoveButton }: ScoreProps) {
  const [editModeOff, setEditModeOff] = usePropState(readOnly)
  const teamPoints = useGameTeamStats(game)[score.team]?.points()
  const [teams, isFetching] = useTeams([score.team])
  const team = teams[0]

  if (isFetching) {
    return <TextLoading className='h-6' />
  }

  function handleOnClick() {
    if (game.completed) return
    setEditModeOff(false)
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
                  onClick={handleOnClick}
                  className={`flex h-full w-12 items-center justify-center truncate rounded-3xl font-bold shadow ${
                    game.completed ? '' : 'cursor-pointer'
                  } ${
                    game.completed
                      ? teamPoints == 3
                        ? 'bg-green-300 text-green-800'
                        : teamPoints == 1
                          ? 'bg-sky-200 text-sky-800'
                          : 'bg-red-200 text-red-800'
                      : 'bg-100'
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
