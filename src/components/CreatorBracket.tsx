import NumberInput from './NumberInput'
import Card from './Card'
import Slot from './Slot'
import { useCallback, useMemo, useState } from 'react'
import { BracketTypes } from '../db/types.ts'
import { camel2Title } from '../helpers.ts'
import SelectInput from './SelectInput.tsx'
import {
  calculateNumRounds,
  calculateRoundData,
  CreatorBracketData,
  CreatorData,
  recursiveUpdateTeamsInOut,
} from '../creator.ts'
import CreatorRound from './CreatorRound.tsx'
import AccordionOpenToggle from './AccordionOpenToggle.tsx'
import Collapsible from './Collapsible.tsx'

type CreatorBracketProps = {
  data: CreatorData
  index: number
  onChange: (data: CreatorData) => void
}

function CreatorBracket({ data, index, onChange }: CreatorBracketProps) {
  const [viewData, setViewData] = useState(false)

  function updateType(selectedType: [value: string, label: string]) {
    const type = selectedType[0] as BracketTypes
    if (!Object.values(BracketTypes).includes(type)) return
    data.brackets[index].type = type
    calculateNumRounds(index, data)
    onChange(data)
  }

  function updateTeamsOut(teamsOut: number) {
    const int = Math.ceil(teamsOut)
    if (isNaN(int) || int < 1) return
    data.brackets[index].teamsOut = int
    recursiveUpdateTeamsInOut(index + 1, data)
    calculateNumRounds(index, data)
    onChange(data)
  }

  function updateNumRounds(numRounds: number) {
    const int = Math.ceil(numRounds)
    if (isNaN(int) || int < 0) return
    data.brackets[index].numRounds = int
    calculateRoundData(index, data)
    onChange(data)
  }

  function updateRounds(bracketData: CreatorBracketData) {
    data.brackets[index].rounds = bracketData.rounds
    onChange(data)
  }

  const nonCustomType = useCallback(
    (bracketData: CreatorBracketData) =>
      bracketData.type != BracketTypes.Custom,
    []
  )

  const typeOptions: [type: string, label: string][] = useMemo(
    () => Object.values(BracketTypes).map((type) => [type, camel2Title(type)]),
    []
  )

  const bracketData = useMemo(() => data.brackets[index], [data, index])

  return (
    <Card>
      <Slot name='header'>
        <div className='flex w-full items-center justify-between p-1'>
          <span className='px-2 font-bold'>{`Bracket ${index + 1}`}</span>
          <AccordionOpenToggle onChange={setViewData} open={viewData} />
        </div>
      </Slot>
      <Slot name='content'>
        <Collapsible open={viewData}>
          <div className='flex flex-col space-y-4 p-3 pt-2'>
            <div className='flex flex-col space-y-2'>
              <div>
                <SelectInput
                  onChange={updateType}
                  options={typeOptions}
                  value={bracketData.type}
                  label='Bracket Type'
                />
              </div>
              <div>
                <NumberInput
                  onChange={() => {}}
                  value={bracketData.teamsIn}
                  disabled={true}
                  label='Teams In'
                />
              </div>
              <div>
                <NumberInput
                  onChange={updateTeamsOut}
                  value={bracketData.teamsOut}
                  label='Teams Out'
                  min={1}
                  max={bracketData.teamsIn}
                />
              </div>
              <div>
                <NumberInput
                  onChange={updateNumRounds}
                  value={bracketData.numRounds}
                  label='Number of Rounds'
                  min={0}
                  disabled={nonCustomType(bracketData)}
                />
              </div>
            </div>

            {bracketData.rounds.length > 0 && (
              <div className='mt-4 flex w-full flex-col space-y-2'>
                {bracketData.rounds.map((_roundData, roundIndex) => (
                  <CreatorRound
                    key={roundIndex}
                    data={bracketData}
                    index={roundIndex}
                    onChange={updateRounds}
                  />
                ))}
              </div>
            )}
          </div>
        </Collapsible>
      </Slot>
    </Card>
  )
}

export default CreatorBracket
