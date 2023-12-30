import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading'
import { useState } from 'react'
import EditModeToggle from './EditModeToggle'
import { TournamentDocType } from '../db/types/tournament'
import TournamentList from './TournamentList'
import AddNewTournamentButton from './AddNewTournamentButton'
import AccordionOpenToggle from './AccordionOpenToggle.tsx'

function AllTournaments() {
  const [editModeOff, setEditModeOff] = useState(true)
  const [bracketsVisible, setBracketsVisible] = useState(false)
  const { result: tournaments, isFetching } = useRxData<TournamentDocType>(
    'tournaments',
    (collection) =>
      collection.find({
        index: ['createdAt'],
      })
  )

  return (
    <div className='flex flex-col rounded-3xl bg-blue-100/50 text-blue-800 backdrop-blur-sm'>
      <div className='flex h-10 w-full items-center justify-between space-x-1 rounded-3xl bg-blue-300 p-1'>
        <span className='grow p-2 font-bold'>Tournaments</span>
        <div className='flex h-full flex-row items-center space-x-1'>
          <EditModeToggle
            onChange={setEditModeOff}
            title='Toggle edit mode all tournaments'
          />
          <AccordionOpenToggle
            onChange={setBracketsVisible}
            title='Toggle show all tournament brackets'
          />
          <AddNewTournamentButton />
        </div>
      </div>
      <div className='p-3 pt-2'>
        {isFetching ? (
          <TextLoading className='h-6' />
        ) : (
          <TournamentList
            tournaments={tournaments}
            showEditButton={true}
            readOnly={editModeOff}
            showBrackets={bracketsVisible}
          />
        )}
      </div>
    </div>
  )
}

export default AllTournaments
