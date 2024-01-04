import TextInput from './TextInput'
import NumberInput from './NumberInput'
import Card from './Card'
import Slot from './Slot'

function CreatorTournament() {
  function updateTournamentName(name: string) {}

  function updateTournamentNumTeams(numTeams: number) {}

  function updateTournamentNumBrackets(numBrackets: number) {}

  return (
    <Card className='bg-100'>
      <Slot name='header'>
        <span className='px-2 font-bold'>Tournament Data</span>
      </Slot>
      <Slot name='content'>
        <div className='flex flex-col space-y-2 p-3'>
          <div className='flex flex-col text-center'>
            <TextInput
              onChange={updateTournamentName}
              value={''}
              label='Name'
              className='text-center'
            />
          </div>

          <div className='flex flex-col text-center'>
            <NumberInput
              onChange={updateTournamentNumTeams}
              value={1}
              label='Number of Teams'
              min={1}
              className='text-center'
            />
          </div>

          <div className='flex flex-col text-center'>
            <NumberInput
              onChange={updateTournamentNumBrackets}
              value={1}
              label='Number of Brackets'
              min={1}
              className='text-center'
            />
          </div>
        </div>
      </Slot>
    </Card>
  )
}

export default CreatorTournament
