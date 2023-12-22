import { createRxDatabase, RxJsonSchema, addRxPlugin } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'
import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression'
import { CompetitionDocType } from './types/competition'
import { GameDocType } from './types/game'
import { MemberDocType } from './types/member'
import { RoundDocType } from './types/round'
import { ScoreDocType } from './types/score'
import { TeamDocType } from './types/team'
import competitionsSchemaJson from './schema/competition.json'
import gamesSchemaJson from './schema/game.json'
import membersSchemaJson from './schema/member.json'
import roundsSchemaJson from './schema/round.json'
import scoresSchemaJson from './schema/score.json'
import teamsSchemaJson from './schema/team.json'
import {
  TournamentDatabase,
  TournamentDatabaseCollections,
} from './types/types'

async function initialize() {
  // enable dev mode
  if (process.env.NODE_ENV !== 'production') {
    await import('rxdb/plugins/dev-mode').then((module) =>
      addRxPlugin(module.RxDBDevModePlugin)
    )
  }

  // Storage
  const storageWithKeyCompression = wrappedKeyCompressionStorage({
    storage: getRxStorageDexie(),
  })

  // create RxDB
  const db: TournamentDatabase =
    await createRxDatabase<TournamentDatabaseCollections>({
      name: 'react-tournament-app',
      storage: storageWithKeyCompression,
    })

  // Schemas
  const competitionsSchema: RxJsonSchema<CompetitionDocType> =
    competitionsSchemaJson
  const gamesSchema: RxJsonSchema<GameDocType> = gamesSchemaJson
  const membersSchema: RxJsonSchema<MemberDocType> = membersSchemaJson
  const roundsSchema: RxJsonSchema<RoundDocType> = roundsSchemaJson
  const scoresSchema: RxJsonSchema<ScoreDocType> = scoresSchemaJson
  const teamsSchema: RxJsonSchema<TeamDocType> = teamsSchemaJson

  // create collections
  await db.addCollections({
    competitions: {
      schema: competitionsSchema,
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
  })

  // maybe sync collection to a remote
  // ...

  // TODO add way to customise data in UI this is just for debugging
  /*await db.members.insert({
    id: '0',
    name: 'Name0',
  })
  await db.members.insert({
    id: '1',
    name: 'Name1',
  })
  await db.teams.insert({
    id: '0',
    name: 'Test Team',
    members: ['0', '1', '2'],
  })*/

  return db
}

export default initialize
