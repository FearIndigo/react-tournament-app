import TextInput from './TextInput'
import { BracketDocument, RoundDocument } from '../db/types'
import TextLoading from './TextLoading'
import AccordionOpenToggle from './AccordionOpenToggle'
import GameList from './GameList'
import AddRoundGame from './AddRoundGame'
import { getRoundName } from '../db/helpers.ts'
import RemoveDocumentButton from './RemoveDocumentButton.tsx'
import { RoundDocType } from '../db/types/round'
import TextInfo from './TextInfo.tsx'
import { usePropState } from '../hooks.tsx'
import { useGames } from '../db/hooks.ts'

type RoundProps = {
  round: RoundDocument
  showGames?: boolean
  readOnly?: boolean
  className?: string
  bracket?: BracketDocument
}

Round.defaultProps = {
  className: '',
}

function Round({ round, showGames, readOnly, className, bracket }: RoundProps) {
  const [editModeOff] = usePropState(readOnly)
  const [gamesVisible, setGamesVisible] = usePropState(showGames ?? false)
  const [games, isFetching] = useGames(round.games)

  function updateName(name: string) {
    round.incrementalPatch({
      name: name,
    })
  }

  const roundName = getRoundName(round, bracket)

  return (
    <div
      className={`bg-100 flex flex-col rounded-3xl text-violet-800 ${className}`}
    >
      <div className='bg-300 h-10 rounded-3xl p-1'>
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
              <RemoveDocumentButton<RoundDocType>
                document={round}
                title='Remove round'
              />
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
            {games.length > 0 ? (
              <GameList games={games} readOnly={editModeOff} />
            ) : isFetching ? (
              <TextLoading className='h-6' />
            ) : (
              <TextInfo text='No games' className='h-6' />
            )}
          </div>
          {!editModeOff && (
            <div className='self-end p-2 pt-0'>
              <AddRoundGame round={round} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Round
