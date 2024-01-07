import { useMemo } from 'react'
import TextInput from './TextInput'
import { BracketDocument, BracketTypes } from '../db/types'
import TextLoading from './TextLoading'
import AccordionOpenToggle from './AccordionOpenToggle'
import { getBracketName } from '../db/helpers'
import AddBracketRound from './AddBracketRound'
import RoundList from './RoundList.tsx'
import RemoveDocumentButton from './RemoveDocumentButton.tsx'
import { BracketDocType } from '../db/types/bracket'
import SelectInput from './SelectInput.tsx'
import { camel2Title } from '../helpers.ts'
import TextInfo from './TextInfo.tsx'
import { usePropState } from '../hooks.tsx'
import { useRounds } from '../db/hooks.ts'

type BracketProps = {
  bracket: BracketDocument
  showRounds?: boolean
  readOnly?: boolean
  className?: string
}

Bracket.defaultProps = {
  className: '',
}

function Bracket({ bracket, showRounds, readOnly, className }: BracketProps) {
  const [editModeOff] = usePropState(readOnly)
  const [roundsVisible, setRoundsVisible] = usePropState(showRounds ?? false)
  const [rounds, isFetching] = useRounds(bracket.rounds)

  const bracketName = getBracketName(bracket)

  function updateName(name: string) {
    bracket.incrementalPatch({
      name: name,
    })
  }

  function updateBracketType(
    selectedOption: [bracketType: string, label: string]
  ) {
    const newBracketType = selectedOption[0] as BracketTypes
    if (!Object.values(BracketTypes).includes(newBracketType)) return

    bracket.incrementalPatch({
      type: newBracketType,
    })
  }

  const options: [bracketType: string, label: string][] = useMemo(
    () => Object.values(BracketTypes).map((type) => [type, camel2Title(type)]),
    []
  )

  return (
    <div
      className={`bg-100 flex flex-col rounded-3xl text-violet-800 ${className}`}
    >
      <div className='bg-300 h-10 rounded-3xl p-1'>
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
              className='w-full font-bold'
            />
          )}

          <div className='flex h-full space-x-1'>
            {!editModeOff && (
              <RemoveDocumentButton<BracketDocType>
                document={bracket}
                title='Remove bracket'
              />
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
          {!editModeOff && (
            <div className='flex items-center p-2 py-1'>
              <SelectInput
                value={bracket.type}
                options={options}
                onChange={updateBracketType}
                className='w-full'
              />
            </div>
          )}
          <div className='p-2 pt-1'>
            {rounds.length > 0 ? (
              <RoundList
                rounds={rounds}
                readOnly={editModeOff}
                bracket={bracket}
              />
            ) : isFetching ? (
              <TextLoading className='h-6' />
            ) : (
              <TextInfo text='No rounds' className='h-6' />
            )}
          </div>
          {!editModeOff && (
            <div className='self-end p-2 pt-0'>
              <AddBracketRound bracket={bracket} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bracket
