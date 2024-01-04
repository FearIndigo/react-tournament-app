import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading'
import { useState } from 'react'
import EditModeToggle from './EditModeToggle'
import { GameDocType } from '../db/types/game'
import AddNewGameButton from './AddNewGameButton'
import GameList from './GameList'
import AccordionOpenToggle from './AccordionOpenToggle.tsx'

function AllGames() {
  const [editModeOff, setEditModeOff] = useState(true)
  const [scoresVisible, setScoresVisible] = useState(false)
  const { result: games, isFetching } = useRxData<GameDocType>(
    'games',
    (collection) =>
      collection.find({
        index: ['createdAt'],
      })
  )

  return (
    <div className='flex flex-col rounded-3xl bg-white/20 text-violet-800 backdrop-blur-sm'>
      <div className='bg-300 flex h-10 w-full items-center justify-between space-x-1 rounded-3xl p-1'>
        <span className='grow p-2 font-bold'>Games</span>
        <div className='flex h-full flex-row items-center space-x-1'>
          <EditModeToggle
            onChange={setEditModeOff}
            title='Toggle edit mode all games'
          />
          <AccordionOpenToggle
            onChange={setScoresVisible}
            title='Toggle show all game teams'
          />
          <AddNewGameButton />
        </div>
      </div>
      <div className='p-3 pt-2'>
        {isFetching ? (
          <TextLoading className='h-6' />
        ) : (
          <GameList
            games={games}
            showEditButton={true}
            readOnly={editModeOff}
            showScores={scoresVisible}
            className='space-y-2'
          />
        )}
      </div>
    </div>
  )
}

export default AllGames
