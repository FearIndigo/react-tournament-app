import DatalistInput from './DatalistInput.tsx'
import AddNewButton from './AddNewButton.tsx'
import { TeamDocument } from '../db/types'
import { useRxCollection, useRxData } from 'rxdb-hooks'
import { MemberDocType } from '../db/types/member'
import { useState } from 'react'
import TextLoading from './TextLoading.tsx'
import { v4 as uuidv4 } from 'uuid'

type AddTeamMemberProps = {
  team: TeamDocument
}

function AddTeamMember({ team }: AddTeamMemberProps) {
  const [selectedOption, setSelectedOption] = useState<
    [memberId: string, memberName: string]
  >(['', ''])
  const { result: members, isFetching } = useRxData<MemberDocType>(
    'members',
    (collection) =>
      collection.find({
        index: ['createdAt'],
      })
  )
  const memberCollection = useRxCollection<MemberDocType>('members')

  if (isFetching) {
    return <TextLoading className='h-6' />
  }

  const filteredMembers = members.filter(
    (member) => !team.members.includes(member.id)
  )

  const options: [id: string, name: string][] = filteredMembers.map(
    (member) => [member.id, member.name]
  )

  function updateSelectedOption(
    newOption: [memberId: string, memberName: string]
  ) {
    setSelectedOption(newOption)
  }

  async function addTeamMember() {
    // NOTE: cannot add members with the same name to the same team when selecting via name
    // Find member via id first
    let memberToAdd = filteredMembers.find(
      (member) => member.id == selectedOption[0]
    )
    // Find member via name second
    if (memberToAdd == undefined) {
      memberToAdd = filteredMembers.find(
        (member) => member.name == selectedOption[1]
      )
    }
    // Add new member third
    if (memberToAdd == undefined) {
      if (memberCollection == undefined || selectedOption[1] == '') return
      memberToAdd = await memberCollection.insert({
        id: uuidv4(),
        name: selectedOption[1],
      })
    }

    team.incrementalPatch({
      members: [...team.members, memberToAdd.id],
    })

    setSelectedOption(['', ''])
  }

  return (
    <div className='flex h-8 items-center space-x-1'>
      <DatalistInput
        onChange={updateSelectedOption}
        placeholder='New member...'
        options={options}
        value={selectedOption[0]}
        className='h-full'
      />
      <div className='flex h-full items-center'>
        <AddNewButton title='Add member to team' onClick={addTeamMember} />
      </div>
    </div>
  )
}

export default AddTeamMember
