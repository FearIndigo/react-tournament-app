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

type CreatorTournamentProps = {
  data: CreatorData
  onChange: (data: CreatorData) => void
}

function CreatorTournament({ data, onChange }: CreatorTournamentProps) {
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
    <Card className='bg-white/20 backdrop-blur-sm'>
      <Slot name='header'>
        <span className='px-3 font-bold'>Tournament</span>
      </Slot>
      <Slot name='content'>
        <div className='flex w-full flex-col space-y-2 p-3 pt-2'>
          <div className='flex flex-col'>
            <TextInput onChange={updateName} value={data.name} label='Name' />
          </div>

          <div className='flex flex-col'>
            <NumberInput
              onChange={updateNumTeams}
              value={data.numTeams}
              label='Number of Teams'
              min={2}
            />
          </div>

          <div className='flex flex-col'>
            <NumberInput
              onChange={updateNumBrackets}
              value={data.numBrackets}
              label='Number of Brackets'
              min={1}
            />
          </div>
        </div>
      </Slot>
    </Card>
  )
}

export default CreatorTournament
