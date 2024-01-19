import { addRxPlugin, createRxDatabase, RxJsonSchema } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'
import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression'

import { AppDatabase, AppDatabaseCollections } from './types'

import { BracketDocType } from './types/bracket'
import { GameDocType } from './types/game'
import { MemberDocType } from './types/member'
import { RoundDocType } from './types/round'
import { ScoreDocType } from './types/score'
import { TeamDocType } from './types/team'
import { TournamentDocType } from './types/tournament'

import bracketsSchemaJson from './schema/bracket.json'
import gamesSchemaJson from './schema/game.json'
import membersSchemaJson from './schema/member.json'
import roundsSchemaJson from './schema/round.json'
import scoresSchemaJson from './schema/score.json'
import teamsSchemaJson from './schema/team.json'
import tournamentsSchemaJson from './schema/tournament.json'
import { RxDBCleanupPlugin } from 'rxdb/plugins/cleanup'
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election'
import initMiddleware from './middleware.ts'

async function initialise() {
  // Enable dev mode
  if (process.env.NODE_ENV !== 'production') {
    await import('rxdb/plugins/dev-mode').then((module) =>
      addRxPlugin(module.RxDBDevModePlugin)
    )
  }

  // Add plugins
  addRxPlugin(RxDBLeaderElectionPlugin)
  addRxPlugin(RxDBCleanupPlugin)

  // Storage
  const storageWithKeyCompression = wrappedKeyCompressionStorage({
    storage: getRxStorageDexie(),
  })

  // Create RxDB
  const db: AppDatabase = await createRxDatabase<AppDatabaseCollections>({
    name: 'react-tournament-app',
    storage: storageWithKeyCompression,
    eventReduce: true,
  })

  // Define schemas
  const bracketsSchema: RxJsonSchema<BracketDocType> = bracketsSchemaJson
  const gamesSchema: RxJsonSchema<GameDocType> = gamesSchemaJson
  const membersSchema: RxJsonSchema<MemberDocType> = membersSchemaJson
  const roundsSchema: RxJsonSchema<RoundDocType> = roundsSchemaJson
  const scoresSchema: RxJsonSchema<ScoreDocType> = scoresSchemaJson
  const teamsSchema: RxJsonSchema<TeamDocType> = teamsSchemaJson
  const tournamentsSchema: RxJsonSchema<TournamentDocType> =
    tournamentsSchemaJson

  // Add collections
  const collections: AppDatabaseCollections = await db.addCollections({
    brackets: {
      schema: bracketsSchema,
    },
    games: {
      schema: gamesSchema,
    },
    members: {
      schema: membersSchema,
    },
    rounds: {
      schema: roundsSchema,
    },
    scores: {
      schema: scoresSchema,
    },
    teams: {
      schema: teamsSchema,
    },
    tournaments: {
      schema: tournamentsSchema,
    },
  })

  // Initialise middleware
  initMiddleware(collections)

  // maybe sync collection to a remote
  // ...

  return db
}

export default initialise
