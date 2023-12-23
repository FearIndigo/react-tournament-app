import DatalistInput from './DatalistInput.tsx'
import AddNewButton from './AddNewButton.tsx'
import { MemberCollection, TeamDocument } from '../db/types/types'
import { useRxData } from 'rxdb-hooks'
import { MemberDocType } from '../db/types/member'
import { useState } from 'react'
import TextLoading from './TextLoading.tsx'

type AddTeamMemberProps = {
  team: TeamDocument
}

function AddTeamMember({ team }: AddTeamMemberProps) {
  const [member, setMember] = useState<MemberDocType>()
  const { result: members, isFetching } = useRxData<MemberDocType>(
    'members',
    (collection: MemberCollection) =>
      collection.find({
        selector: {
          id: { $nin: team.members },
        },
      })
  )

  if (isFetching) {
    return <TextLoading />
  }

  //const collection = useRxCollection<MemberDocType>('members')
  const options: [id: string, name: string][] = members?.map((member) => [
    member.id,
    member.name,
  ])

  function addTeamMember() {
    if (member == undefined) return
    if (team.members.includes(member.id)) return

    team.incrementalPatch({
      members: [...team.members, member.id],
    })
  }

  function updateMemberToAdd(memberId: string) {
    const memberToAdd = members?.find((member) => member.id == memberId)
    if (memberToAdd == undefined) return
    setMember(memberToAdd)
  }

  return (
    <div className='flex h-8 items-center space-x-1'>
      <DatalistInput
        onChange={updateMemberToAdd}
        options={options}
        value=''
        className='h-full'
      />
      <AddNewButton title='Add member to team' onClick={addTeamMember} />
    </div>
  )
}

export default AddTeamMember
