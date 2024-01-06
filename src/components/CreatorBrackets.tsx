import NumberInput from './NumberInput'
import Card from './Card'
import Slot from './Slot'
import { useCallback, useMemo } from 'react'
import { BracketTypes } from '../db/types.ts'
import { camel2Title } from '../helpers.ts'
import SelectInput from './SelectInput.tsx'
import {
  recursiveUpdateTeamsInOut,
  CreatorData,
  calculateNumRounds,
  CreatorBracketData,
} from '../creator.ts'

type CreatorBracketsProps = {
  data: CreatorData
  onChange: (data: CreatorData) => void
}

function CreatorBrackets({ data, onChange }: CreatorBracketsProps) {
  function updateType(index: number, type: string) {
    const selectedType = type as BracketTypes
    if (!Object.values(BracketTypes).includes(selectedType)) return
    data.brackets[index].type = selectedType
    onChange(data)
  }

  function updateTeamsOut(index: number, teamsOut: number) {
    const int = Math.ceil(teamsOut)
    if (isNaN(int) || int < 1) return
    data.brackets[index].teamsOut = int

    recursiveUpdateTeamsInOut(index + 1, data)
    calculateNumRounds(index, data)
    onChange(data)
  }

  function updateNumRounds(index: number, numRounds: number) {
    const int = Math.ceil(numRounds)
    if (isNaN(int) || int < 1) return
    data.brackets[index].numRounds = int

    onChange(data)
  }

  const disableNumRounds = useCallback((bracketData: CreatorBracketData) => {
    switch (bracketData.type) {
      case BracketTypes.Elimination:
        return true
      case BracketTypes.DoubleElimination:
        return true
      case BracketTypes.RoundRobin:
        return true
      case BracketTypes.Finals:
        return true
      case BracketTypes.Custom:
        return false
    }
  }, [])

  const typeOptions: [type: string, label: string][] = useMemo(
    () => Object.values(BracketTypes).map((type) => [type, camel2Title(type)]),
    []
  )

  return (
    <Card className='bg-white/20 backdrop-blur-sm'>
      <Slot name='header'>
        <span className='px-3 font-bold'>Brackets Data</span>
      </Slot>
      <Slot name='content'>
        <div className='flex w-full flex-col space-y-2 p-3 pt-2'>
          {data.brackets.map((bracketData, index) => (
            <div key={index} className='flex flex-col'>
              <span className='text-center font-bold'>{`Bracket ${
                index + 1
              }`}</span>
              <div className='flex flex-col'>
                <SelectInput
                  onChange={(selected) => updateType(index, selected[0])}
                  options={typeOptions}
                  value={bracketData.type}
                  label='Bracket Type'
                />
              </div>

              <div className='flex flex-col'>
                <NumberInput
                  onChange={() => {}}
                  value={bracketData.teamsIn}
                  disabled={true}
                  label='Teams In'
                />
              </div>

              <div className='flex flex-col'>
                <NumberInput
                  onChange={(value) => updateTeamsOut(index, value)}
                  value={bracketData.teamsOut}
                  label='Teams Out'
                  min={1}
                  max={bracketData.teamsIn}
                />
              </div>

              <div className='flex flex-col'>
                <NumberInput
                  onChange={(value) => updateNumRounds(index, value)}
                  value={bracketData.numRounds}
                  label='Num Rounds'
                  min={1}
                  disabled={disableNumRounds(bracketData)}
                />
              </div>
            </div>
          ))}
        </div>
      </Slot>
    </Card>
  )
}

export default CreatorBrackets
