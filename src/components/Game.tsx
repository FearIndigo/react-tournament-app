import { useEffect, useMemo, useState } from 'react'
import { GameDocument, GameTypes } from '../db/types'
import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading'
import EditModeToggle from './EditModeToggle'
import { ScoreDocType } from '../db/types/score'
import AddGameScore from './AddGameScore'
import ScoreList from './ScoreList'
import RemoveGameButton from './RemoveGameButton'
import { camel2Title } from '../helpers.tsx'
import SelectInput from './SelectInput'

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
    (collection) =>
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

  function updateGameType(selectedOption: [gameType: string, label: string]) {
    const newGameType = selectedOption[0] as GameTypes
    if (!Object.values(GameTypes).includes(newGameType)) return

    game.incrementalPatch({
      type: newGameType,
    })
  }

  const options: [gameType: string, label: string][] = useMemo(
    () => Object.values(GameTypes).map((type) => [type, camel2Title(type)]),
    []
  )

  return (
    <div className='flex flex-col rounded-3xl bg-blue-100 text-blue-800'>
      {showEditButton && (
        <div className='h-10 rounded-3xl bg-blue-300 p-1'>
          <div className='flex h-full items-center justify-between space-x-1'>
            <span className='truncate rounded-3xl p-2 font-bold'>...</span>
            <div className='flex h-full space-x-1'>
              {!editModeOff && <RemoveGameButton game={game} />}
              <EditModeToggle
                readOnly={readOnly}
                onChange={setEditModeOff}
                title='Toggle game edit mode'
              />
            </div>
          </div>
        </div>
      )}
      {!editModeOff && (
        <div className='flex items-center p-2 py-1'>
          <SelectInput
            value={game.type}
            options={options}
            onChange={updateGameType}
            className='w-full'
          />
        </div>
      )}
      <div
        className={`flex flex-col space-y-2 p-2 ${showEditButton && 'pt-1'}`}
      >
        {isFetching ? (
          <TextLoading className='h-6' />
        ) : (
          <ScoreList
            scores={scores.sort((score) => game.scores.indexOf(score.id))}
            readOnly={editModeOff}
            game={game}
          />
        )}
      </div>
      {!editModeOff && (
        <div className='p-2 pt-0'>
          <AddGameScore game={game} currentScores={scores} />
        </div>
      )}
    </div>
  )
}

export default Game
