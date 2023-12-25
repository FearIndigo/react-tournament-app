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
  const [selectedOption, setSelectedOption] =
    useState<[memberId: string, memberName: string]>()
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

  const options: [id: string, name: string][] = members
    .filter((member) => !team.members.includes(member.id))
    .map((member) => [member.id, member.name])

  function updateSelectedOption(
    newOption: [memberId: string, memberName: string]
  ) {
    setSelectedOption(newOption)
  }

  async function addTeamMember() {
    if (selectedOption == undefined) return
    // NOTE: cannot add members with the same name to the same team when selecting via name
    let memberToAdd = members.find(
      (member) =>
        member.id == selectedOption[0] || member.name == selectedOption[1]
    )
    if (memberToAdd == undefined) {
      if (memberCollection == undefined) return
      memberToAdd = await memberCollection.insert({
        id: uuidv4(),
        name: selectedOption[1],
      })
    }
    if (team.members.includes(memberToAdd.id)) return

    team.incrementalPatch({
      members: [...team.members, memberToAdd.id],
    })

    setSelectedOption(undefined)
  }

  return (
    <div className='flex h-8 items-center space-x-1'>
      <DatalistInput
        onChange={updateSelectedOption}
        placeholder='New member...'
        options={options}
        value={selectedOption ? selectedOption[1] : ''}
        className='h-full'
      />
      <div className='flex h-full items-center'>
        <AddNewButton title='Add member to team' onClick={addTeamMember} />
      </div>
    </div>
  )
}

export default AddTeamMember
