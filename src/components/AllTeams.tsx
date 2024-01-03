import { useRxData } from 'rxdb-hooks'
import TextLoading from './TextLoading.tsx'
import { TeamDocType } from '../db/types/team'
import TeamList from './TeamList.tsx'
import AddNewTeamButton from './AddNewTeamButton.tsx'
import AccordionOpenToggle from './AccordionOpenToggle.tsx'
import { useState } from 'react'
import EditModeToggle from './EditModeToggle.tsx'

function AllTeams() {
  const [editModeOff, setEditModeOff] = useState(true)
  const [membersVisible, setMembersVisible] = useState(false)
  const { result: teams, isFetching } = useRxData<TeamDocType>(
    'teams',
    (collection) =>
      collection.find({
        index: ['createdAt'],
      })
  )

  return (
    <div className='flex flex-col rounded-3xl bg-blue-100/50 text-blue-800 backdrop-blur-sm'>
      <div className='bg-300 flex h-10 w-full items-center justify-between space-x-1 rounded-3xl p-1'>
        <span className='grow p-2 font-bold'>Teams</span>
        <div className='flex h-full flex-row items-center space-x-1'>
          <EditModeToggle
            onChange={setEditModeOff}
            title='Toggle edit mode all teams'
          />
          <AccordionOpenToggle
            onChange={setMembersVisible}
            title='Toggle show all team members'
          />
          <AddNewTeamButton />
        </div>
      </div>
      <div className='p-3 pt-2'>
        {isFetching ? (
          <TextLoading className='h-6' />
        ) : (
          <TeamList
            teams={teams}
            showEditButton={true}
            showMembers={membersVisible}
            readOnly={editModeOff}
          />
        )}
      </div>
    </div>
  )
}

export default AllTeams
