import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading'
import { useState } from 'react'
import EditModeToggle from './EditModeToggle'
import { GameDocType } from '../db/types/game'
import AddNewGameButton from './AddNewGameButton'
import GameList from './GameList'
import AccordionOpenToggle from './AccordionOpenToggle.tsx'
import TextInfo from './TextInfo.tsx'
import Slot from './Slot.tsx'
import Card from './Card.tsx'

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
    <Card className='bg-white/20 backdrop-blur-sm'>
      <Slot name='header'>
        <div className='flex h-full w-full items-center justify-between p-1'>
          <span className='px-2 font-bold'>Games</span>
          <div className='flex h-full flex-row items-center space-x-1'>
            <EditModeToggle
              editModeOff={editModeOff}
              onChange={setEditModeOff}
              title='Toggle edit mode all games'
            />
            <AccordionOpenToggle
              open={scoresVisible}
              onChange={setScoresVisible}
              title='Toggle show all game teams'
            />
            <AddNewGameButton />
          </div>
        </div>
      </Slot>
      <Slot name='content'>
        <div className='p-3 pt-2'>
          {games.length > 0 ? (
            <GameList
              games={games}
              showEditButton={true}
              readOnly={editModeOff}
              showScores={scoresVisible}
              className='space-y-2'
            />
          ) : isFetching ? (
            <TextLoading className='h-6' />
          ) : (
            <TextInfo text='No games' className='h-6' />
          )}
        </div>
      </Slot>
    </Card>
  )
}

export default AllGames
