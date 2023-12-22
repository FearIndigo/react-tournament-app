import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading.tsx'
import { TeamDocType } from '../db/types/team'
import TeamList from './TeamList.tsx'

function AllTeams() {
  const { result: teams, isFetching } = useRxData<TeamDocType>(
    'teams',
    (collection) => collection.find()
  )

  return (
    <div className='flex w-60 flex-col rounded-3xl bg-blue-100/80 text-blue-800 backdrop-blur'>
      <div className='flex h-10 w-full items-center rounded-3xl bg-blue-300 p-1 px-3'>
        <span className='font-bold'>Teams</span>
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
