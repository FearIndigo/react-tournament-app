import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading'
import { useState } from 'react'
import EditModeToggle from './EditModeToggle'
import { TournamentDocType } from '../db/types/tournament'
import TournamentList from './TournamentList'
import AddNewTournamentButton from './AddNewTournamentButton'
import AccordionOpenToggle from './AccordionOpenToggle.tsx'
import TextInfo from './TextInfo.tsx'

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
    <div className='flex flex-col rounded-3xl bg-white/20 text-violet-800 backdrop-blur-sm'>
      <div className='bg-300 flex h-10 w-full items-center justify-between space-x-1 rounded-3xl p-1'>
        <span className='grow p-2 font-bold'>Tournaments</span>
        <div className='flex h-full flex-row items-center space-x-1'>
          <EditModeToggle
            editModeOff={editModeOff}
            onChange={setEditModeOff}
            title='Toggle edit mode all tournaments'
          />
          <AccordionOpenToggle
            open={bracketsVisible}
            onChange={setBracketsVisible}
            title='Toggle show all tournament brackets'
          />
          <AddNewTournamentButton />
        </div>
      </div>
      <div className='p-3 pt-2'>
        {tournaments.length > 0 ? (
          <TournamentList
            tournaments={tournaments}
            showEditButton={true}
            readOnly={editModeOff}
            showBrackets={bracketsVisible}
          />
        ) : isFetching ? (
          <TextLoading className='h-6' />
        ) : (
          <TextInfo text='No tournaments' className='h-6' />
        )}
      </div>
    </div>
  )
}

export default AllTournaments
