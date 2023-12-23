import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading.tsx'
import { TeamDocType } from '../db/types/team'
import TeamList from './TeamList.tsx'
import AddNewTeamButton from './AddNewTeamButton.tsx'
import AccordionOpenToggle from './AccordionOpenToggle.tsx'
import { useState } from 'react'

function AllTeams() {
  const [membersVisible, setMembersVisible] = useState(false)
  const { result: teams, isFetching } = useRxData<TeamDocType>(
    'teams',
    (collection) => collection.find()
  )

  return (
    <div className='flex w-60 flex-col rounded-3xl bg-blue-100/80 text-blue-800 backdrop-blur'>
      <div className='flex h-10 w-full items-center justify-between space-x-1 rounded-3xl bg-blue-300 p-1'>
        <span className='grow p-2 font-bold'>Teams</span>
        <div className='flex h-full flex-row items-center space-x-1'>
          <AddNewTeamButton />
          <AccordionOpenToggle
            open={membersVisible}
            onChange={setMembersVisible}
            title='Toggle show all team members'
          />
        </div>
      </div>
      <div className='p-3 pt-2'>
        {isFetching ? (
          <TextLoading className='h-8' />
        ) : (
          <TeamList
            teams={teams}
            showEditButton={true}
            showMembers={membersVisible}
          />
        )}
      </div>
    </div>
  )
}

export default AllTeams
