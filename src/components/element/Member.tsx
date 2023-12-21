import { useRxData } from 'rxdb-hooks'
import { MemberDocType } from '../../db/types/member'

type MemberProps = {
  memberId: string
  readOnly: boolean
}

function Member({ memberId, readOnly }: MemberProps) {
  const { result: result, isFetching } = useRxData<MemberDocType>(
    'members',
    (collection) =>
      collection.find({
        selector: {
          id: memberId,
        },
      })
  )

  if (isFetching) {
    return <span className='animate-pulse'>loading...</span>
  }

  if (result?.length == 0) {
    return <span className='text-red-500'>missing!</span>
  }

  const member = result[0]

  return (
    member && (
      <span>
        {member.fistName} {member.secondName}
      </span>
    )
  )
}

export default Member
