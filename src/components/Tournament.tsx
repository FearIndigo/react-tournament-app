import { useEffect, useState } from 'react'
import TextInput from './TextInput'
import { TournamentDocument } from '../db/types'
import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading'
import EditModeToggle from './EditModeToggle'
import AccordionOpenToggle from './AccordionOpenToggle'
import { BracketDocType } from '../db/types/bracket'
import BracketList from './BracketList.tsx'
import AddTournamentBracket from './AddTournamentBracket'
import RemoveDocumentButton from './RemoveDocumentButton.tsx'
import { TournamentDocType } from '../db/types/tournament'

type TournamentProps = {
  tournament: TournamentDocument
  showBrackets?: boolean
  readOnly?: boolean
  className?: string
  showEditButton?: boolean
}

Tournament.defaultProps = {
  readOnly: true,
  className: '',
}

function Tournament({
  tournament,
  showBrackets,
  readOnly,
  className,
  showEditButton,
}: TournamentProps) {
  const [editModeOff, setEditModeOff] = useState(readOnly)
  const [bracketsVisible, setBracketsVisible] = useState(showBrackets)
  const { result: brackets, isFetching } = useRxData<BracketDocType>(
    'brackets',
    (collection) =>
      collection.find({
        selector: {
          id: { $in: tournament.brackets },
        },
        index: ['createdAt'],
      })
  )

  useEffect(() => {
    setBracketsVisible(showBrackets)
  }, [showBrackets])

  useEffect(() => {
    setEditModeOff(readOnly)
  }, [readOnly])

  function updateName(name: string) {
    tournament.incrementalPatch({
      name: name,
    })
  }

  return (
    <div
      className={`bg-100 flex flex-col rounded-3xl text-blue-800 ${className}`}
    >
      <div className='bg-300 h-10 rounded-3xl p-1'>
        <div className='flex h-full items-center justify-between space-x-1'>
          {editModeOff ? (
            <span className='truncate rounded-3xl p-2 font-bold'>
              {tournament.name}
            </span>
          ) : (
            <TextInput
              value={tournament.name}
              placeholder='Name...'
              onChange={updateName}
              className='font-bold'
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
                readOnly={readOnly}
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
      </div>
      <div
        className={`collapsible-wrapper flex-col rounded-b-3xl ${
          bracketsVisible ? '' : 'collapsed'
        }`}
      >
        <div className='collapsible'>
          <div className='p-2 pt-1'>
            {isFetching ? (
              <TextLoading className='h-6' />
            ) : (
              <BracketList brackets={brackets} readOnly={editModeOff} />
            )}
          </div>
          {!editModeOff && (
            <div className='p-2 pt-0'>
              <AddTournamentBracket tournament={tournament} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tournament
