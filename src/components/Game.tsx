import { useMemo } from 'react'
import { GameDocument, GameTypes } from '../db/types'
import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading'
import EditModeToggle from './EditModeToggle'
import { ScoreDocType } from '../db/types/score'
import AddGameScore from './AddGameScore'
import ScoreList from './ScoreList'
import { camel2Title } from '../helpers'
import SelectInput from './SelectInput'
import AccordionOpenToggle from './AccordionOpenToggle'
import { useGameName } from '../db/hooks'
import TextInput from './TextInput'
import RemoveDocumentButton from './RemoveDocumentButton.tsx'
import { GameDocType } from '../db/types/game'
import TextInfo from './TextInfo.tsx'
import { usePropState } from '../hooks.tsx'

type GameProps = {
  game: GameDocument
  readOnly?: boolean
  showEditButton?: boolean
  showScores?: boolean
}

function Game({ game, readOnly, showEditButton, showScores }: GameProps) {
  const [editModeOff, setEditModeOff] = usePropState(readOnly ?? true)
  const [scoresVisible, setScoresVisible] = usePropState(showScores ?? false)
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

  const gameName = useGameName(game)

  function updateGameName(newName: string) {
    game.incrementalPatch({
      name: newName,
    })
  }

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
    <div className='bg-100 flex flex-col rounded-3xl text-violet-800'>
      <div className='bg-300 h-10 rounded-3xl p-1'>
        <div className='flex h-full items-center justify-between space-x-1'>
          {editModeOff ? (
            <span className='truncate rounded-3xl p-2 font-bold'>
              {gameName}
            </span>
          ) : (
            <TextInput
              value={game.name}
              placeholder={gameName ?? 'Name...'}
              onChange={updateGameName}
              className='font-bold'
            />
          )}

          <div className='flex h-full space-x-1'>
            {!editModeOff && (
              <RemoveDocumentButton<GameDocType>
                document={game}
                title='Remove game'
              />
            )}
            {showEditButton && (
              <EditModeToggle
                editModeOff={editModeOff}
                onChange={setEditModeOff}
                title='Toggle game edit mode'
              />
            )}
            <AccordionOpenToggle
              open={scoresVisible}
              onChange={setScoresVisible}
              title='Toggle show game teams'
            />
          </div>
        </div>
      </div>
      <div
        className={`collapsible-wrapper flex-col rounded-b-3xl ${
          scoresVisible ? '' : 'collapsed'
        }`}
      >
        <div className='collapsible'>
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

          <div className='p-2 pt-1'>
            {scores.length > 0 ? (
              <ScoreList
                scores={scores}
                readOnly={editModeOff}
                game={game}
                showRemoveButton={!editModeOff}
              />
            ) : isFetching ? (
              <TextLoading className='h-6' />
            ) : (
              <TextInfo text='No teams' className='h-6' />
            )}
          </div>

          {!editModeOff && (
            <div className='p-2 pt-0'>
              <AddGameScore game={game} currentScores={scores} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Game
