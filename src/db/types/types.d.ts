import { RxDatabase, RxCollection, RxDocument } from 'rxdb'
import { BracketDocType } from './bracket'
import { GameDocType } from './game'
import { MemberDocType } from './member'
import { RoundDocType } from './round'
import { ScoreDocType } from './score'
import { TeamDocType } from './team'
import { TournamentDocType } from './tournament'

// Collections
export type BracketCollection = RxCollection<BracketDocType>
export type GameCollection = RxCollection<GameDocType>
export type MemberCollection = RxCollection<MemberDocType>
export type RoundCollection = RxCollection<RoundDocType>
export type ScoreCollection = RxCollection<ScoreDocType>
export type TeamCollection = RxCollection<TeamDocType>
export type TournamentCollection = RxCollection<CompetitionDocType>

// Documents
export type BracketDocument = RxDocument<BracketDocType>
export type TournamentDocument = RxDocument<TournamentDocType>
export type GameDocument = RxDocument<GameDocType>
export type MemberDocument = RxDocument<MemberDocType>
export type RoundDocument = RxDocument<RoundDocType>
export type ScoreDocument = RxDocument<ScoreDocType>
export type TeamDocument = RxDocument<TeamDocType>

// Helper
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
export type AppDatabase = RxDatabase<DatabaseCollections>
