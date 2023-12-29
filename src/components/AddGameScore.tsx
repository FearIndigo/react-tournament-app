import DatalistInput from './DatalistInput'
import AddNewButton from './AddNewButton'
import { GameDocument, ScoreDocument } from '../db/types'
import { useRxCollection, useRxData } from 'rxdb-hooks'
import { useEffect, useMemo, useState } from 'react'
import TextLoading from './TextLoading.tsx'
import { v4 as uuidv4 } from 'uuid'
import { TeamDocType } from '../db/types/team'
import { ScoreDocType } from '../db/types/score'
import { getTeamName } from '../db/helpers'

type AddGameScoreProps = {
  game: GameDocument
  currentScores: ScoreDocument[]
}

function AddGameScore({ game, currentScores }: AddGameScoreProps) {
  const [selectedOption, setSelectedOption] = useState<
    [teamId: string, teamName: string]
  >(['', ''])
  const [options, setOptions] = useState<[teamId: string, teamName: string][]>(
    []
  )
  const { result: teams, isFetching } = useRxData<TeamDocType>(
    'teams',
    (collection) =>
      collection.find({
        index: ['createdAt'],
      })
  )

  const filteredTeams = useMemo(
    () =>
      teams.filter(
        (team) => !currentScores.map((score) => score.team).includes(team.id)
      ),
    [currentScores, teams]
  )

  useEffect(() => {
    const getOptions = async (): Promise<[id: string, name: string][]> => {
      const mappedTeams: [id: string, name: string][] = []
      for (const team of filteredTeams) {
        const teamName = await getTeamName(team)
        mappedTeams.push([team.id, teamName])
      }
      return mappedTeams
    }

    getOptions().then(setOptions)
  }, [filteredTeams])

  const scoreCollection = useRxCollection<ScoreDocType>('scores')
  const teamCollection = useRxCollection<TeamDocType>('teams')

  if (isFetching) {
    return <TextLoading className='h-6' />
  }

  async function addNewScore() {
    let option = selectedOption
    if (option[0] == '') {
      if (options.length == 0) return
      option = options[0]
    }
    // NOTE: cannot add teams with the same name to the same game when selecting via name
    // Find team via id first
    let teamToAdd = filteredTeams.find((team) => team.id == option[0])
    // Find team via name second
    if (teamToAdd == undefined) {
      teamToAdd = filteredTeams.find((team) => team.name == option[1])
    }
    // Add new team third
    if (teamToAdd == undefined) {
      if (teamCollection == undefined) return
      teamToAdd = await teamCollection.insert({
        id: uuidv4(),
        name: option[1],
        members: [],
      })
    }

    // Add new score
    if (scoreCollection == undefined) return
    const scoreToAdd = await scoreCollection.insert({
      id: uuidv4(),
      game: game.id,
      team: teamToAdd.id,
      score: 0,
    })

    // Assign score to game
    game.incrementalPatch({
      scores: [...game.scores, scoreToAdd.id],
    })

    setSelectedOption(['', ''])
  }

  return (
    <div className='flex h-8 items-center space-x-1'>
      <DatalistInput
        onChange={setSelectedOption}
        placeholder={options.length > 0 ? options[0][1] : 'Team name...'}
        options={options}
        value={selectedOption[0]}
        className='h-full'
      />
      <div className='flex h-full items-center'>
        <AddNewButton title='Add team to game' onClick={addNewScore} />
      </div>
    </div>
  )
}

export default AddGameScore
