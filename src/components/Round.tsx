import { useEffect, useState } from 'react'
import TextInput from './TextInput'
import { BracketDocument, RoundDocument } from '../db/types'
import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading'
import AccordionOpenToggle from './AccordionOpenToggle'
import { GameDocType } from '../db/types/game'
import GameList from './GameList'
import RemoveRoundButton from './RemoveRoundButton'
import AddRoundGameButton from './AddRoundGameButton'
import { getRoundName } from '../db/helpers.ts'

type RoundProps = {
  round: RoundDocument
  showGames?: boolean
  readOnly?: boolean
  className?: string
  bracket?: BracketDocument
}

Round.defaultProps = {
  readOnly: true,
  className: '',
}

function Round({ round, showGames, readOnly, className, bracket }: RoundProps) {
  const [editModeOff, setEditModeOff] = useState(readOnly)
  const [gamesVisible, setGamesVisible] = useState(showGames)
  const { result: games, isFetching } = useRxData<GameDocType>(
    'games',
    (collection) =>
      collection.find({
        selector: {
          id: { $in: round.games },
        },
        index: ['createdAt'],
      })
  )

  useEffect(() => {
    setGamesVisible(showGames)
  }, [showGames])

  useEffect(() => {
    setEditModeOff(readOnly)
  }, [readOnly])

  function updateName(name: string) {
    round.incrementalPatch({
      name: name,
    })
  }

  const roundName = getRoundName(round, bracket)

  return (
    <div
      className={`flex flex-col rounded-3xl bg-blue-100 text-blue-800 ${className}`}
    >
      <div className='h-10 rounded-3xl bg-blue-300 p-1'>
        <div className='flex h-full items-center justify-between space-x-1'>
          {editModeOff ? (
            <span className='truncate rounded-3xl p-2 font-bold'>
              {roundName}
            </span>
          ) : (
            <TextInput
              value={round.name}
              placeholder={roundName ?? 'Name...'}
              onChange={updateName}
              className='font-bold'
            />
          )}

          <div className='flex h-full space-x-1'>
            {!editModeOff && (
              <>
                <RemoveRoundButton round={round} />
                <AddRoundGameButton round={round} />
              </>
            )}
            <AccordionOpenToggle
              open={gamesVisible}
              onChange={setGamesVisible}
              title='Toggle show round games'
            />
          </div>
        </div>
      </div>
      <div
        className={`collapsible-wrapper flex-col rounded-b-3xl ${
          gamesVisible ? '' : 'collapsed'
        }`}
      >
        <div className='collapsible'>
          <div className='p-2 pt-1'>
            {isFetching ? (
              <TextLoading className='h-6' />
            ) : (
              <GameList games={games} readOnly={editModeOff} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Round
