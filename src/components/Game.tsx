import { useEffect, useState } from 'react'
import { GameDocument, ScoreCollection } from '../db/types'
import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading.tsx'
import EditModeToggle from './EditModeToggle'
import { ScoreDocType } from '../db/types/score'
import AddScore from './AddScore'
import ScoreList from './ScoreList'
import RemoveGameButton from './RemoveGameButton'

type GameProps = {
  game: GameDocument
  readOnly?: boolean
  showEditButton?: boolean
}

Game.defaultProps = {
  readOnly: true,
}

function Game({ game, readOnly, showEditButton }: GameProps) {
  const [editModeOff, setEditModeOff] = useState(readOnly)
  const { result: scores, isFetching } = useRxData<ScoreDocType>(
    'scores',
    (collection: ScoreCollection) =>
      collection.find({
        selector: {
          id: { $in: game.scores },
        },
        index: ['createdAt'],
      })
  )

  useEffect(() => {
    setEditModeOff(readOnly)
  }, [readOnly])

  return (
    <div className='flex flex-col rounded-3xl bg-blue-100 text-blue-800'>
      <div className='h-10 rounded-3xl bg-blue-300 p-1'>
        <div className='flex h-full items-center justify-between space-x-1'>
          <span className='truncate rounded-3xl p-2 font-bold'>...</span>
          <div className='flex h-full space-x-1'>
            {!editModeOff && <RemoveGameButton game={game} />}
            {showEditButton && (
              <EditModeToggle
                readOnly={readOnly}
                onChange={setEditModeOff}
                title='Toggle game edit mode'
              />
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col space-y-2 p-2 pt-1'>
        {isFetching ? (
          <TextLoading className='h-6' />
        ) : (
          <ScoreList scores={scores} readOnly={editModeOff} game={game} />
        )}
      </div>
      {!editModeOff && (
        <div className='p-2 pt-0'>
          <AddScore game={game} currentScores={scores} />
        </div>
      )}
    </div>
  )
}

export default Game
