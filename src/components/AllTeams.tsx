import { useRxCollection, useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading.tsx'
import { TeamDocType } from '../db/types/team'
import TeamList from './TeamList.tsx'
import AddNewButton from './AddNewButton.tsx'

function AllTeams() {
  const { result: teams, isFetching } = useRxData<TeamDocType>(
    'teams',
    (collection) => collection.find()
  )

  const collection = useRxCollection<TeamDocType>('teams')
  function addNewTeam() {
    collection?.insert({
      id: crypto.randomUUID(),
    })
  }

  return (
    <div className='flex w-60 flex-col rounded-3xl bg-blue-100/80 text-blue-800 backdrop-blur'>
      <div className='flex h-10 w-full items-center justify-between space-x-1 rounded-3xl bg-blue-300 p-1'>
        <span className='p-2 font-bold'>Teams</span>
        <AddNewButton title='Add new team' onClick={addNewTeam} />
      </div>
      <div className='p-3 pt-2'>
        {isFetching ? (
          <TextLoading className='h-8' />
        ) : (
          <TeamList teams={teams} showEditButton={true} />
        )}
      </div>
    </div>
  )
}

export default AllTeams
