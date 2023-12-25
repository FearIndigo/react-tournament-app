import DatalistInput from './DatalistInput'
import AddNewButton from './AddNewButton'
import { GameDocument, ScoreDocument } from '../db/types'
import { useRxCollection, useRxData } from 'rxdb-hooks'
import { useEffect, useState } from 'react'
import TextLoading from './TextLoading.tsx'
import { v4 as uuidv4 } from 'uuid'
import { TeamDocType } from '../db/types/team'
import { ScoreDocType } from '../db/types/score'
import { getTeamName } from '../db/helpers'

type AddScoreProps = {
  game: GameDocument
  currentScores: ScoreDocument[]
}

function AddScore({ game, currentScores }: AddScoreProps) {
  const [selectedOption, setSelectedOption] =
    useState<[teamId: string, teamName: string]>()
  const [options, setOptions] = useState<[teamId: string, teamName: string][]>(
    []
  )
  const { result: teams, isFetching: fetchingTeams } = useRxData<TeamDocType>(
    'teams',
    (collection) =>
      collection.find({
        index: ['createdAt'],
      })
  )

  useEffect(() => {
    const getOptions = async (): Promise<[id: string, name: string][]> => {
      const filteredTeams = teams.filter(
        (team) => !currentScores.map((score) => score.team).includes(team.id)
      )
      const mappedTeams: [id: string, name: string][] = []
      for (const team of filteredTeams) {
        const teamName = await getTeamName(team)
        mappedTeams.push([team.id, teamName])
      }
      return mappedTeams
    }

    getOptions().then(setOptions)
  }, [teams, currentScores])

  const scoreCollection = useRxCollection<ScoreDocType>('scores')

  if (fetchingTeams) {
    return <TextLoading className='h-6' />
  }

  function updateSelectedOption(
    newOption: [memberId: string, memberName: string]
  ) {
    setSelectedOption(newOption)
  }

  async function addNewScore() {
    if (selectedOption == undefined) return
    // NOTE: cannot add teams with the same name to the same game when selecting via name
    const teamToAdd = teams.find(
      (team) => team.id == selectedOption[0] || team.name == selectedOption[1]
    )
    if (teamToAdd == undefined) return
    if (currentScores.find((score) => score.team == teamToAdd.id)) return
    if (scoreCollection == undefined) return
    const scoreToAdd = await scoreCollection.insert({
      id: uuidv4(),
      game: game.id,
      team: teamToAdd.id,
      score: 0,
    })

    game.incrementalPatch({
      scores: [...game.scores, scoreToAdd.id],
    })

    setSelectedOption(undefined)
  }

  return (
    <div className='flex h-8 items-center space-x-1'>
      <DatalistInput
        onChange={updateSelectedOption}
        placeholder='New score...'
        options={options}
        value={selectedOption ? selectedOption[1] : ''}
        className='h-full'
      />
      <div className='flex h-full items-center'>
        <AddNewButton title='Add score to game' onClick={addNewScore} />
      </div>
    </div>
  )
}

export default AddScore
