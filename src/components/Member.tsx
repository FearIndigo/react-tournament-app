import { useRxData } from 'rxdb-hooks'
import { MemberDocType } from '../db/types/member'
import TextLoading from './TextLoading.tsx'

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

  let content
  if (isFetching) {
    // Fetching
    content = <TextLoading className='h-6' />
  } else if (result?.length == 0) {
    // No records
    content = <span className='animate-pulse text-red-500'>missing!</span>
  } else {
    // Render
    const member = result[0]
    content = (
      <span>
        {member.fistName} {member.secondName}
      </span>
    )
  }

  return content
}

export default Member
