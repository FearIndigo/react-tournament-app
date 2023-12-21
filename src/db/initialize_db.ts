import { createRxDatabase } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'

async function initialize() {
  // create RxDB
  const db = await createRxDatabase({
    name: 'react-tournament-app',
    storage: getRxStorageDexie(),
  })

  // create collections
  await db.addCollections({
    characters: {
      schema: {
        title: 'characters',
        version: 0,
        type: 'object',
        primaryKey: 'id',
        properties: {
          id: {
            type: 'string',
            maxLength: 100,
          },
          name: {
            type: 'string',
          },
        },
      },
    },
  })

  // maybe sync collection to a remote
  // ...

  return db
}

export default initialize
