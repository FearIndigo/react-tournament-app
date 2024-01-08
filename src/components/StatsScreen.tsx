import { useRxData } from 'rxdb-hooks'
import { TournamentDocType } from '../db/types/tournament'
import SelectInput from './SelectInput.tsx'
import { useMemo, useState } from 'react'
import TournamentStats from './TournamentStats.tsx'

type StatsScreenProps = {
  className?: string
}

StatsScreen.defaultProps = {
  className: '',
}

function StatsScreen({ className }: StatsScreenProps) {
  const [selectedOption, setSelectedOption] = useState<
    [id: string, name: string]
  >(['', ''])
  const { result: tournaments } = useRxData<TournamentDocType>(
    'tournaments',
    (collection) =>
      collection.find({
        index: ['createdAt'],
      })
  )

  const options: [id: string, name: string][] = useMemo(
    () => tournaments.map((t) => [t.id, t.name]),
    [tournaments]
  )

  const selectedTournament = useMemo(
    () => tournaments.find((t) => t.id == selectedOption[0]),
    [tournaments, selectedOption]
  )

  if (!selectedTournament && selectedOption[0] != '') {
    setSelectedOption(['', ''])
  }

  return (
    <div className={`container my-4 flex justify-center px-4 ${className}`}>
      <div className='flex w-full flex-col items-center justify-center space-y-2'>
        <SelectInput
          onChange={setSelectedOption}
          options={options}
          value={selectedOption[0]}
          className='w-full md:w-96'
        />
        {selectedTournament && (
          <TournamentStats tournament={selectedTournament} className='' />
        )}
      </div>
    </div>
  )
}

export default StatsScreen
