import { useMemo } from 'react'
import { GameDocument, GameTypes } from '../db/types'
import TextLoading from './TextLoading'
import EditModeToggle from './EditModeToggle'
import AddGameScore from './AddGameScore'
import ScoreList from './ScoreList'
import { camel2Title } from '../helpers'
import SelectInput from './SelectInput'
import AccordionOpenToggle from './AccordionOpenToggle'
import { useGameName, useScores } from '../db/hooks'
import TextInput from './TextInput'
import RemoveDocumentButton from './RemoveDocumentButton.tsx'
import { GameDocType } from '../db/types/game'
import TextInfo from './TextInfo.tsx'
import { usePropState } from '../hooks.tsx'
import Slot from './Slot.tsx'
import Card from './Card.tsx'
import GameCompletedToggle from './GameCompletedToggle.tsx'

type GameProps = {
  game: GameDocument
  readOnly?: boolean
  showEditButton?: boolean
  className?: string
  showScores?: boolean
}

Game.defaultProps = {
  className: '',
}

function Game({
  game,
  readOnly,
  showEditButton,
  className,
  showScores,
}: GameProps) {
  const [editModeOff, setEditModeOff] = usePropState(readOnly ?? true)
  const [scoresVisible, setScoresVisible] = usePropState(showScores ?? false)
  const [scores, isFetching] = useScores(game.scores)

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

  function updateGameCompleted(completed: boolean) {
    game.incrementalPatch({
      completed: completed,
    })
  }

  const options: [gameType: string, label: string][] = useMemo(
    () => Object.values(GameTypes).map((type) => [type, camel2Title(type)]),
    []
  )

  return (
    <Card className={`bg-100 ${className}`}>
      <Slot name='header'>
        <div className='flex h-full w-full items-center justify-between space-x-1 p-1'>
          {editModeOff ? (
            <span className='truncate px-2 font-bold'>{gameName}</span>
          ) : (
            <TextInput
              value={game.name}
              placeholder={gameName ?? 'Name...'}
              onChange={updateGameName}
              className='w-full font-bold'
            />
          )}

          <div className='flex h-full space-x-1'>
            {!editModeOff ? (
              <RemoveDocumentButton<GameDocType>
                document={game}
                title='Remove game'
              />
            ) : (
              <GameCompletedToggle
                completed={game.completed}
                onChange={updateGameCompleted}
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
      </Slot>
      <Slot name='content'>
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
      </Slot>
    </Card>
  )
}

export default Game
