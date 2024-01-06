import { BracketTypes } from './db/types.ts'

export type CreatorData = {
  name: string
  numTeams: number
  numBrackets: number
  brackets: CreatorBracketData[]
}

export type CreatorBracketData = {
  type: BracketTypes
  teamsIn: number
  teamsOut: number
  numRounds: number
}

export const defaultBracketData: CreatorBracketData = {
  type: BracketTypes.Elimination,
  teamsIn: 2,
  teamsOut: 1,
  numRounds: 1,
}

export const defaultCreatorData: CreatorData = {
  name: 'New Tournament',
  numTeams: 2,
  numBrackets: 1,
  brackets: [{ ...defaultBracketData }],
}

export function copyData(data: CreatorData): CreatorData {
  return { ...data, brackets: [...data.brackets] }
}

export function recursiveUpdateTeamsInOut(index: number, data: CreatorData) {
  if (index > data.numBrackets - 1) return
  const teamsIn = index == 0 ? data.numTeams : data.brackets[index - 1].teamsOut
  const bracketData = data.brackets[index]
  bracketData.teamsIn = teamsIn
  if (teamsIn < bracketData.teamsOut) {
    bracketData.teamsOut = teamsIn
    recursiveUpdateTeamsInOut(index + 1, data)
  }
  calculateNumRounds(index, data)
}

export function calculateNumRounds(index: number, data: CreatorData) {
  const bracketData = data.brackets[index]
  switch (bracketData.type) {
    default:
    case BracketTypes.Elimination:
      bracketData.numRounds = Math.ceil(
        Math.log2(bracketData.teamsIn) - Math.log2(bracketData.teamsOut)
      )

      break
    case BracketTypes.DoubleElimination:
      break
    case BracketTypes.RoundRobin:
      bracketData.numRounds = bracketData.teamsIn - 1
      break
    case BracketTypes.Finals:
      break
    case BracketTypes.Custom:
      break
  }
}
