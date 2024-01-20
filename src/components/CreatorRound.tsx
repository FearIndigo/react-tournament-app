import NumberInput from './NumberInput'
import Card from './Card'
import Slot from './Slot'
import { useCallback, useMemo, useState } from 'react'
import { BracketTypes } from '../db/types.ts'
import { CreatorBracketData } from '../creator.ts'
import AccordionOpenToggle from './AccordionOpenToggle.tsx'
import Collapsible from './Collapsible.tsx'

type CreatorRoundProps = {
  data: CreatorBracketData
  index: number
  onChange: (data: CreatorBracketData) => void
}

function CreatorRound({ data, index, onChange }: CreatorRoundProps) {
  const [viewData, setViewData] = useState(false)

  function updateTeamsInRound(numRounds: number) {
    const int = Math.ceil(numRounds)
    if (isNaN(int) || int < 0) return
    data.rounds[index].numTeams = int
    onChange(data)
  }

  function updateGamesInRound(numGames: number) {
    const int = Math.ceil(numGames)
    if (isNaN(int) || int < 0) return
    data.rounds[index].numGames = int
    onChange(data)
  }

  const nonCustomType = useCallback(
    (bracketData: CreatorBracketData) =>
      bracketData.type != BracketTypes.Custom,
    []
  )

  const roundData = useMemo(() => data.rounds[index], [data, index])

  return (
    <Card>
      <Slot name='header'>
        <div className='flex w-full items-center justify-between p-1'>
          <span className='px-2 font-bold'>{`Round ${index + 1}`}</span>
          <AccordionOpenToggle onChange={setViewData} open={viewData} />
        </div>
      </Slot>
      <Slot name='content'>
        <Collapsible open={viewData}>
          <div className='flex flex-col space-y-2 p-3 pt-2'>
            <div>
              <NumberInput
                onChange={updateTeamsInRound}
                value={roundData.numTeams}
                label='Teams in Round'
                max={data.teamsIn}
                disabled={nonCustomType(data)}
              />
            </div>
            <div>
              <NumberInput
                onChange={updateGamesInRound}
                value={roundData.numGames}
                label='Games in Round'
                min={0}
                disabled={nonCustomType(data)}
              />
            </div>
          </div>
        </Collapsible>
      </Slot>
    </Card>
  )
}

export default CreatorRound
