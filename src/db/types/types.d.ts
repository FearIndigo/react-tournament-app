import { RxDatabase, RxCollection, RxDocument } from 'rxdb'
import { MemberDocType } from './member'
import { CompetitionDocType } from './competition'
import { GameDocType } from './game'
import { RoundDocType } from './round'
import { ScoreDocType } from './score'
import { TeamDocType } from './team'

// Collections
export type CompetitionCollection = RxCollection<CompetitionDocType>
export type GameCollection = RxCollection<GameDocType>
export type MemberCollection = RxCollection<MemberDocType>
export type RoundCollection = RxCollection<RoundDocType>
export type ScoreCollection = RxCollection<ScoreDocType>
export type TeamCollection = RxCollection<TeamDocType>

// Documents
export type CompetitionDocument = RxDocument<CompetitionDocType>
export type GameDocument = RxDocument<GameDocType>
export type MemberDocument = RxDocument<MemberDocType>
export type RoundDocument = RxDocument<RoundDocType>
export type ScoreDocument = RxDocument<ScoreDocType>
export type TeamDocument = RxDocument<TeamDocType>

// Helper
export type TournamentDatabaseCollections = {
  competitions: CompetitionCollection
  games: GameCollection
  members: MemberCollection
  rounds: RoundCollection
  scores: ScoreCollection
  teams: TeamCollection
}

// Database
export type TournamentDatabase = RxDatabase<TournamentDatabaseCollections>
