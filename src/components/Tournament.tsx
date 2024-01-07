import TextInput from './TextInput'
import { TournamentDocument } from '../db/types'
import TextLoading from './TextLoading'
import EditModeToggle from './EditModeToggle'
import AccordionOpenToggle from './AccordionOpenToggle'
import BracketList from './BracketList.tsx'
import AddTournamentBracket from './AddTournamentBracket'
import RemoveDocumentButton from './RemoveDocumentButton.tsx'
import { TournamentDocType } from '../db/types/tournament'
import TextInfo from './TextInfo.tsx'
import { usePropState } from '../hooks.tsx'
import { useBrackets } from '../db/hooks.ts'
import Slot from './Slot.tsx'
import Card from './Card.tsx'

type TournamentProps = {
  tournament: TournamentDocument
  showBrackets?: boolean
  readOnly?: boolean
  className?: string
  showEditButton?: boolean
}

Tournament.defaultProps = {
  className: '',
}

function Tournament({
  tournament,
  showBrackets,
  readOnly,
  className,
  showEditButton,
}: TournamentProps) {
  const [editModeOff, setEditModeOff] = usePropState(readOnly ?? true)
  const [bracketsVisible, setBracketsVisible] = usePropState(
    showBrackets ?? false
  )
  const [brackets, isFetching] = useBrackets(tournament.brackets)

  function updateName(name: string) {
    tournament.incrementalPatch({
      name: name,
    })
  }

  return (
    <Card className={`bg-100 ${className}`}>
      <Slot name='header'>
        <div className='flex h-full w-full items-center justify-between space-x-1 p-1'>
          {editModeOff ? (
            <span className='truncate px-2 font-bold'>{tournament.name}</span>
          ) : (
            <TextInput
              value={tournament.name}
              placeholder='Name...'
              onChange={updateName}
              className='w-full font-bold'
            />
          )}

          <div className='flex h-full space-x-1'>
            {!editModeOff && (
              <RemoveDocumentButton<TournamentDocType>
                document={tournament}
                title='Remove tournament'
              />
            )}
            {showEditButton && (
              <EditModeToggle
                editModeOff={editModeOff}
                onChange={setEditModeOff}
                title='Toggle tournament edit mode'
              />
            )}
            <AccordionOpenToggle
              open={bracketsVisible}
              onChange={setBracketsVisible}
              title='Toggle show tournament brackets'
            />
          </div>
        </div>
      </Slot>
      <Slot name='content'>
        <div
          className={`collapsible-wrapper flex-col rounded-b-3xl ${
            bracketsVisible ? '' : 'collapsed'
          }`}
        >
          <div className='collapsible'>
            <div className='p-2 pt-1'>
              {brackets.length > 0 ? (
                <BracketList brackets={brackets} readOnly={editModeOff} />
              ) : isFetching ? (
                <TextLoading className='h-6' />
              ) : (
                <TextInfo text='No brackets' className='h-6' />
              )}
            </div>
            {!editModeOff && (
              <div className='p-2 pt-0'>
                <AddTournamentBracket tournament={tournament} />
              </div>
            )}
          </div>
        </div>
      </Slot>
    </Card>
  )
}

export default Tournament
