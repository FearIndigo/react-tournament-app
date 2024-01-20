import { useRxCollection } from 'rxdb-hooks'
import { v4 as uuidv4 } from 'uuid'
import { RoundDocType } from '../db/types/round'
import { CreatorData } from '../creator.ts'
import { TournamentDocType } from '../db/types/tournament'
import { BracketDocType } from '../db/types/bracket'

type CreatorSubmitProps = {
  data: CreatorData
}

function CreatorSubmit({ data }: CreatorSubmitProps) {
  const tournamentCollection = useRxCollection<TournamentDocType>('tournaments')
  const bracketCollection = useRxCollection<BracketDocType>('brackets')
  const roundCollection = useRxCollection<RoundDocType>('rounds')
  const gameCollection = useRxCollection<RoundDocType>('games')

  async function create() {
    if (
      !tournamentCollection ||
      !bracketCollection ||
      !roundCollection ||
      !gameCollection
    )
      return

    console.log(uuidv4())
    console.log(data)
  }

  return (
    <div className='flex justify-center text-violet-800'>
      <button className='button bg-100 font-bold' onClick={create}>
        Create Tournament!
      </button>
    </div>
  )
}

export default CreatorSubmit
