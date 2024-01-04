import AddNewButton from './AddNewButton.tsx'
import { GameTypes, RoundDocument } from '../db/types'
import { useRxCollection } from 'rxdb-hooks'
import { v4 as uuidv4 } from 'uuid'
import { GameDocType } from '../db/types/game'
import SelectInput from './SelectInput.tsx'
import { useMemo, useState } from 'react'
import { camel2Title } from '../helpers.ts'

type AddRoundGameProps = {
  round: RoundDocument
}

function AddRoundGame({ round }: AddRoundGameProps) {
  const [gameType, setGameType] = useState<GameTypes>(GameTypes.HighestScore)
  const gameCollection = useRxCollection<GameDocType>('games')

  function setSelectedGameType(selectedOption: [type: string, label: string]) {
    const selectedGameType = selectedOption[0] as GameTypes
    if (!Object.values(GameTypes).includes(selectedGameType)) return

    setGameType(selectedGameType)
  }

  async function addNewRoundGame() {
    if (gameCollection == undefined) return

    // Create new game
    const gameToAdd = await gameCollection.insert({
      id: uuidv4(),
      name: `Game ${round.games.length + 1}`,
      type: gameType,
      scores: [],
    })

    // Assign game to round
    round.incrementalPatch({
      games: [...round.games, gameToAdd.id],
    })
  }

  const options: [type: string, label: string][] = useMemo(
    () => Object.values(GameTypes).map((type) => [type, camel2Title(type)]),
    []
  )

  return (
    <div className='flex h-8  items-center space-x-1'>
      <SelectInput
        onChange={setSelectedGameType}
        options={options}
        value={gameType}
        className='w-full'
      />

      <div className='flex h-full items-center'>
        <AddNewButton title='Add game to round' onClick={addNewRoundGame} />
      </div>
    </div>
  )
}

export default AddRoundGame
