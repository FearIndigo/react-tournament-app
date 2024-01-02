import { useEffect, useState } from 'react'
import TextInput from './TextInput'
import { BracketDocument } from '../db/types'
import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading'
import AccordionOpenToggle from './AccordionOpenToggle'
import { RoundDocType } from '../db/types/round'
import RemoveBracketButton from './RemoveBracketButton.tsx'
import { getBracketName } from '../db/helpers.tsx'
import AddBracketRoundButton from './AddBracketRoundButton.tsx'

type BracketProps = {
  bracket: BracketDocument
  showRounds?: boolean
  readOnly?: boolean
  className?: string
}

Bracket.defaultProps = {
  readOnly: true,
  className: '',
}

function Bracket({ bracket, showRounds, readOnly, className }: BracketProps) {
  const [editModeOff, setEditModeOff] = useState(readOnly)
  const [roundsVisible, setRoundsVisible] = useState(showRounds)
  const { result: rounds, isFetching } = useRxData<RoundDocType>(
    'rounds',
    (collection) =>
      collection.find({
        selector: {
          id: { $in: bracket.rounds },
        },
        index: ['createdAt'],
      })
  )

  useEffect(() => {
    setRoundsVisible(showRounds)
  }, [showRounds])

  useEffect(() => {
    setEditModeOff(readOnly)
  }, [readOnly])

  const bracketName = getBracketName(bracket)

  function updateName(name: string) {
    bracket.incrementalPatch({
      name: name,
    })
  }

  return (
    <div
      className={`flex flex-col rounded-3xl bg-blue-100 text-blue-800 ${className}`}
    >
      <div className='h-10 rounded-3xl bg-blue-300 p-1'>
        <div className='flex h-full items-center justify-between space-x-1'>
          {editModeOff ? (
            <span className='truncate rounded-3xl p-2 font-bold'>
              {bracketName}
            </span>
          ) : (
            <TextInput
              value={bracket.name}
              placeholder={bracketName ?? 'Name...'}
              onChange={updateName}
              className='font-bold'
            />
          )}

          <div className='flex h-full space-x-1'>
            {!editModeOff && (
              <>
                <RemoveBracketButton bracket={bracket} />
                <AddBracketRoundButton bracket={bracket} />
              </>
            )}
            <AccordionOpenToggle
              open={roundsVisible}
              onChange={setRoundsVisible}
              title='Toggle show bracket rounds'
            />
          </div>
        </div>
      </div>
      <div
        className={`collapsible-wrapper flex-col rounded-b-3xl ${
          roundsVisible ? '' : 'collapsed'
        }`}
      >
        <div className='collapsible'>
          <div className='p-2 pt-1'>
            {isFetching ? (
              <TextLoading className='h-6' />
            ) : (
              /*<RoundsList
                rounds={rounds}
                readOnly={editModeOff}
                bracket={bracket}
              />*/
              <div className='flex flex-col space-y-1'>
                {rounds.map((round) => (
                  <span
                    key={round.id}
                    className='flex h-10 w-full items-center truncate rounded-3xl bg-blue-300 p-2'
                  >
                    {round.id}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bracket
