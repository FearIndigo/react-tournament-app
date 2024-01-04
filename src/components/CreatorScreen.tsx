import TextInput from './TextInput.tsx'
import { useState } from 'react'
import NumberInput from './NumberInput.tsx'
import CreatorContainer from './CreatorContainer.tsx'

type FormData = {
  tournamentName: string
  numTeams: number
}

const defaultFormData: FormData = {
  tournamentName: '',
  numTeams: 1,
}

function CreatorScreen() {
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  console.log(formData)
  return (
    <div className='container flex flex-col items-center justify-center px-4 text-violet-800'>
      <CreatorContainer title='Tournament'>
        <div className='flex flex-col text-center'>
          <TextInput
            onChange={(newName) =>
              setFormData({ ...formData, tournamentName: newName })
            }
            value={formData.tournamentName}
            placeholder='Tournament name...'
            label='Name'
            className='text-center'
          />
        </div>

        <div className='flex flex-col text-center'>
          <NumberInput
            onChange={(numTeams) =>
              setFormData({ ...formData, numTeams: numTeams })
            }
            value={formData.numTeams}
            label='Number of Teams'
            min={1}
            step={1}
          />
        </div>
      </CreatorContainer>
    </div>
  )
}

export default CreatorScreen
