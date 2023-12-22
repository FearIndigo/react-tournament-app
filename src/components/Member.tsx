import { useRxData } from 'rxdb-hooks'
import { MemberDocType } from '../db/types/member'
import TextLoading from './TextLoading.tsx'
import TextInput from './TextInput.tsx'
import { MemberDocument } from '../db/types/types'
import TextMissing from './TextMissing.tsx'

type MemberProps = {
  memberId: string
  readOnly?: boolean
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

  function updateName(member: MemberDocument, name: string) {
    member.incrementalPatch({
      name: name,
    })
  }

  let content
  if (isFetching) {
    // Fetching
    content = <TextLoading className='h-6' />
  } else if (result?.length == 0) {
    // No records
    content = <TextMissing className='h-6' />
  } else {
    // Render
    const member = result[0]
    if (readOnly) {
      content = <span className='h-6 truncate'>{member.name}</span>
    } else {
      content = (
        <TextInput
          value={member.name}
          placeholder='Name...'
          onChange={(name) => updateName(member, name)}
          className='h-8'
        />
      )
    }
  }

  return content
}

export default Member
