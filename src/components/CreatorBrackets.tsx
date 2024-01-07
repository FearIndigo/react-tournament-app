import NumberInput from './NumberInput'
import Card from './Card'
import Slot from './Slot'
import { useCallback, useMemo } from 'react'
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

type CreatorBracketsProps = {
  data: CreatorData
  onChange: (data: CreatorData) => void
}

function CreatorBrackets({ data, onChange }: CreatorBracketsProps) {
  function updateType(index: number, type: string) {
    const selectedType = type as BracketTypes
    if (!Object.values(BracketTypes).includes(selectedType)) return
    data.brackets[index].type = selectedType
    calculateNumRounds(index, data)
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
    if (isNaN(int) || int < 0) return
    data.brackets[index].numRounds = int
    calculateRoundData(index, data)
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

  return (
    <>
      {data.brackets.map((bracketData, bracketIndex) => (
        <Card key={bracketIndex} className='bg-white/20 backdrop-blur-sm'>
          <Slot name='header'>
            <span className='px-3 text-center font-bold'>{`Bracket ${
              bracketIndex + 1
            }`}</span>
          </Slot>
          <Slot name='content'>
            <div className='flex w-full flex-col space-y-2 p-3 pt-2'>
              <div className='flex flex-col'>
                <SelectInput
                  onChange={(selected) => updateType(bracketIndex, selected[0])}
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
                  onChange={(value) => updateTeamsOut(bracketIndex, value)}
                  value={bracketData.teamsOut}
                  label='Teams Out'
                  min={1}
                  max={bracketData.teamsIn}
                />
              </div>

              <div className='flex flex-col'>
                <NumberInput
                  onChange={(value) => updateNumRounds(bracketIndex, value)}
                  value={bracketData.numRounds}
                  label='Number of Rounds'
                  min={0}
                  disabled={nonCustomType(bracketData)}
                />
              </div>

              {bracketData.rounds.length > 0 && (
                <div className='flex w-full flex-col space-y-2 pt-2'>
                  {bracketData.rounds.map((roundData, roundIndex) => (
                    <div key={roundIndex} className='flex flex-col'>
                      <span className='text-center font-bold'>{`Round ${
                        roundIndex + 1
                      }`}</span>

                      <div className='flex flex-col'>
                        <NumberInput
                          onChange={() => {}}
                          value={roundData.numTeams}
                          label='Teams in Round'
                          max={bracketData.teamsIn}
                          disabled={nonCustomType(bracketData)}
                        />
                      </div>

                      <div className='flex flex-col'>
                        <NumberInput
                          onChange={() => {}}
                          value={roundData.numGames}
                          label='Games in Round'
                          disabled={nonCustomType(bracketData)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Slot>
        </Card>
      ))}
    </>
  )
}

export default CreatorBrackets