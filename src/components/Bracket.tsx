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
import Slot from './Slot.tsx'
import Card from './Card.tsx'
import Collapsible from './Collapsible.tsx'

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
    <Card className={`bg-100 ${className}`}>
      <Slot name='header'>
        <div className='flex h-full w-full items-center justify-between space-x-1 p-1'>
          {editModeOff ? (
            <span className='truncate px-2 font-bold'>{bracketName}</span>
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
      </Slot>
      <Slot name='content'>
        <Collapsible open={roundsVisible}>
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
        </Collapsible>
      </Slot>
    </Card>
  )
}

export default Bracket
