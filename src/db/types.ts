import { RxDatabase, RxCollection, RxDocument } from 'rxdb'
import { BracketDocType } from './types/bracket'
import { GameDocType } from './types/game'
import { MemberDocType } from './types/member'
import { RoundDocType } from './types/round'
import { ScoreDocType } from './types/score'
import { TeamDocType } from './types/team'
import { TournamentDocType } from './types/tournament'

// Interfaces
export interface ITimestamps {
  createdAt?: string
  updatedAt?: string
}

// Enums
export enum GameTypes {
  HighestScore = 'highestScore',
  LowestScore = 'lowestScore',
}
export enum BracketTypes {
  Elimination = 'elimination',
  DoubleElimination = 'doubleElimination',
  RoundRobin = 'roundRobin',
  Finals = 'finals',
  Custom = 'custom',
}

// Collections
export type BracketCollection = RxCollection<BracketDocType>
export type GameCollection = RxCollection<GameDocType>
export type MemberCollection = RxCollection<MemberDocType>
export type RoundCollection = RxCollection<RoundDocType>
export type ScoreCollection = RxCollection<ScoreDocType>
export type TeamCollection = RxCollection<TeamDocType>
export type TournamentCollection = RxCollection<TournamentDocType>

// Documents
export type BracketDocument = RxDocument<BracketDocType>
export type GameDocument = RxDocument<GameDocType>
export type MemberDocument = RxDocument<MemberDocType>
export type RoundDocument = RxDocument<RoundDocType>
export type ScoreDocument = RxDocument<ScoreDocType>
export type TeamDocument = RxDocument<TeamDocType>
export type TournamentDocument = RxDocument<TournamentDocType>

// All collections
export type AppDatabaseCollections = {
  brackets: BracketCollection
  games: GameCollection
  members: MemberCollection
  rounds: RoundCollection
  scores: ScoreCollection
  teams: TeamCollection
  tournaments: TournamentCollection
}

// Database
export type AppDatabase = RxDatabase<AppDatabaseCollections>
