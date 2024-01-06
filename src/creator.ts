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
  rounds: CreatorRoundData[]
}

export type CreatorRoundData = {
  numTeams: number
  numGames: number
}

export const defaultRoundData: CreatorRoundData = {
  numTeams: 2,
  numGames: 1,
}

export const defaultBracketData: CreatorBracketData = {
  type: BracketTypes.Elimination,
  teamsIn: 2,
  teamsOut: 1,
  numRounds: 1,
  rounds: [deepCopy(defaultRoundData)],
}

export const defaultCreatorData: CreatorData = {
  name: 'New Tournament',
  numTeams: 2,
  numBrackets: 1,
  brackets: [deepCopy(defaultBracketData)],
}

export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export function recursiveUpdateTeamsInOut(
  startIndex: number,
  data: CreatorData
) {
  if (startIndex > data.numBrackets - 1) return
  const teamsIn =
    startIndex == 0 ? data.numTeams : data.brackets[startIndex - 1].teamsOut
  const bracketData = data.brackets[startIndex]
  bracketData.teamsIn = teamsIn
  if (teamsIn < bracketData.teamsOut) {
    bracketData.teamsOut = teamsIn
    recursiveUpdateTeamsInOut(startIndex + 1, data)
  }

  calculateNumRounds(startIndex, data)
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
      bracketData.numRounds = 2 * Math.ceil(bracketData.teamsIn / 2) - 1
      break
    case BracketTypes.Finals:
      break
    case BracketTypes.Custom:
      break
  }

  calculateRoundData(index, data)
}

export function calculateRoundData(index: number, data: CreatorData) {
  const bracketData = data.brackets[index]
  bracketData.rounds.length = bracketData.numRounds
  bracketData.rounds.fill(deepCopy(defaultRoundData))
  switch (bracketData.type) {
    default:
    case BracketTypes.Elimination:
      for (let i = 0; i < bracketData.numRounds; i++) {
        const numTeams =
          i == 0
            ? bracketData.teamsIn
            : bracketData.rounds[i - 1].numGames +
              (bracketData.rounds[i - 1].numTeams % 2)
        bracketData.rounds[i] = {
          numTeams: numTeams,
          numGames: Math.floor(numTeams / 2),
        }
      }
      break
    case BracketTypes.DoubleElimination:
      break
    case BracketTypes.RoundRobin:
      bracketData.rounds.fill({
        numTeams: bracketData.teamsIn,
        numGames: Math.floor(bracketData.teamsIn / 2),
      })
      break
    case BracketTypes.Finals:
      break
    case BracketTypes.Custom:
      break
  }
}
