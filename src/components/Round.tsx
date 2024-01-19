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
import Slot from './Slot.tsx'
import Card from './Card.tsx'
import Collapsible from './Collapsible.tsx'

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
    <Card className={`bg-100 ${className}`}>
      <Slot name='header'>
        <div className='flex h-full w-full items-center justify-between space-x-1 p-1'>
          {editModeOff ? (
            <span className='truncate px-2 font-bold'>{roundName}</span>
          ) : (
            <TextInput
              value={round.name}
              placeholder={roundName ?? 'Name...'}
              onChange={updateName}
              className='w-full font-bold'
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
      </Slot>
      <Slot name='content'>
        <Collapsible open={gamesVisible}>
          <div className='p-2 pt-1'>
            {games.length > 0 ? (
              <GameList games={games} />
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
        </Collapsible>
      </Slot>
    </Card>
  )
}

export default Round
