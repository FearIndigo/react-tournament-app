import AddNewButton from './AddNewButton'
import { BracketTypes, TournamentDocument } from '../db/types'
import { useRxCollection } from 'rxdb-hooks'
import { useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BracketDocType } from '../db/types/bracket'
import SelectInput from './SelectInput'
import { camel2Title } from '../helpers'

type AddTournamentBracketProps = {
  tournament: TournamentDocument
}

function AddTournamentBracket({ tournament }: AddTournamentBracketProps) {
  const [bracketType, setBracketType] = useState<BracketTypes>(
    BracketTypes.Elimination
  )
  const bracketCollection = useRxCollection<BracketDocType>('brackets')

  function setSelectedBracketType(
    selectedOption: [type: string, label: string]
  ) {
    const selectedBracketType = selectedOption[0] as BracketTypes
    if (!Object.values(BracketTypes).includes(selectedBracketType)) return

    setBracketType(selectedBracketType)
  }

  async function addNewTournamentBracket() {
    if (bracketCollection == undefined) return

    // Create new bracket
    const bracketToAdd = await bracketCollection.insert({
      id: uuidv4(),
      name: '',
      type: bracketType,
      rounds: [],
    })

    // Assign bracket to tournament
    tournament.incrementalPatch({
      brackets: [...tournament.brackets, bracketToAdd.id],
    })
  }

  const options: [type: string, label: string][] = useMemo(
    () => Object.values(BracketTypes).map((type) => [type, camel2Title(type)]),
    []
  )

  return (
    <div className='flex h-8  items-center space-x-1'>
      <SelectInput
        onChange={setSelectedBracketType}
        options={options}
        value={bracketType}
        className='w-full'
      />

      <div className='flex h-full items-center'>
        <AddNewButton
          title='Add bracket to tournament'
          onClick={addNewTournamentBracket}
        />
      </div>
    </div>
  )
}

export default AddTournamentBracket
