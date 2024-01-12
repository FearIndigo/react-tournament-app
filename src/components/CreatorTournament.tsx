import TextInput from './TextInput'
import NumberInput from './NumberInput'
import Card from './Card'
import Slot from './Slot'
import {
  defaultBracketData,
  CreatorData,
  recursiveUpdateTeamsInOut,
  calculateNumRounds,
} from '../creator.ts'
import { useState } from 'react'
import AccordionOpenToggle from './AccordionOpenToggle.tsx'
import Collapsible from './Collapsible.tsx'

type CreatorTournamentProps = {
  data: CreatorData
  onChange: (data: CreatorData) => void
}

function CreatorTournament({ data, onChange }: CreatorTournamentProps) {
  const [viewData, setViewData] = useState(true)

  function updateName(name: string) {
    data.name = name
    onChange(data)
  }

  function updateNumTeams(numTeams: number) {
    const int = Math.ceil(numTeams)
    if (isNaN(int) || int < 1) return
    data.numTeams = int

    recursiveUpdateTeamsInOut(0, data)

    onChange(data)
  }

  function updateNumBrackets(numBrackets: number) {
    const int = Math.ceil(numBrackets)
    if (isNaN(int) || int < 1) return
    data.numBrackets = int
    if (int != data.brackets.length) {
      const oldLength = data.brackets.length
      data.brackets.length = int
      if (int > oldLength) {
        data.brackets.fill({ ...defaultBracketData }, oldLength)
        recursiveUpdateTeamsInOut(oldLength, data)
        calculateNumRounds(oldLength, data)
      }
    }
    onChange(data)
  }

  return (
    <Card>
      <Slot name='header'>
        <div className='flex w-full items-center justify-between p-1'>
          <span className='px-2 font-bold'>Tournament</span>
          <AccordionOpenToggle onChange={setViewData} open={viewData} />
        </div>
      </Slot>
      <Slot name='content'>
        <Collapsible open={viewData}>
          <div className='flex w-full flex-col space-y-2 p-3 pt-2'>
            <div>
              <TextInput onChange={updateName} value={data.name} label='Name' />
            </div>
            <div>
              <NumberInput
                onChange={updateNumTeams}
                value={data.numTeams}
                label='Number of Teams'
                min={2}
              />
            </div>
            <div>
              <NumberInput
                onChange={updateNumBrackets}
                value={data.numBrackets}
                label='Number of Brackets'
                min={1}
              />
            </div>
          </div>
        </Collapsible>
      </Slot>
    </Card>
  )
}

export default CreatorTournament
