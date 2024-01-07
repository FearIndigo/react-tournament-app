import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading'
import { useState } from 'react'
import EditModeToggle from './EditModeToggle'
import { TournamentDocType } from '../db/types/tournament'
import TournamentList from './TournamentList'
import AddNewTournamentButton from './AddNewTournamentButton'
import AccordionOpenToggle from './AccordionOpenToggle.tsx'
import TextInfo from './TextInfo.tsx'
import Slot from './Slot.tsx'
import Card from './Card.tsx'

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
    <Card className='bg-white/20 backdrop-blur-sm'>
      <Slot name='header'>
        <div className='flex h-full w-full items-center justify-between p-1'>
          <span className='px-2 font-bold'>Tournaments</span>
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
      </Slot>
      <Slot name='content'>
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
      </Slot>
    </Card>
  )
}

export default AllTournaments
