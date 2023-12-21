import MemberList from './MemberList.tsx'
import { useRxData } from 'rxdb-hooks'
import { TeamDocType } from '../../db/types/team'

type TeamProps = {
  teamId: string
  showMembers: boolean
  readOnly: boolean
}

function Member({ teamId, showMembers, readOnly }: TeamProps) {
  const { result: result, isFetching } = useRxData<TeamDocType>(
    'teams',
    (collection) =>
      collection.find({
        selector: {
          id: teamId,
        },
      })
  )

  if (isFetching) {
    return <span className='animate-pulse'>loading...</span>
  }

  if (result?.length == 0) {
    return <span className='text-red-500'>missing!</span>
  }

  const team = result[0]

  return (
    <div className='flex flex-col'>
      <span className='text-lg font-bold'>{team.name}</span>
      {showMembers && <MemberList members={team.members} readOnly={readOnly} />}
    </div>
  )
}

export default Member
