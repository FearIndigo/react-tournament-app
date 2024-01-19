import { AnyCollection, AppDatabaseCollections } from './types.ts'

function initTimestamps(collection: AnyCollection) {
  collection.preInsert((data) => {
    const isoDateTime = new Date().toISOString()
    data.createdAt = isoDateTime
    data.updatedAt = isoDateTime
  }, false)

  collection.preSave((data) => {
    data.updatedAt = new Date().toISOString()
  }, false)
}

function initMiddleware(collections: AppDatabaseCollections) {
  // Add timestamps middleware
  Object.values(collections).forEach((collection) => initTimestamps(collection))

  // When tournament removed, also remove it's brackets
  collections.tournaments.postRemove((data) => {
    return collections.brackets.bulkRemove(data.brackets)
  }, false)

  // When removing bracket, also remove it's ID from tournaments
  collections.brackets.preRemove((data) => {
    return collections.tournaments
      .find({
        selector: {
          brackets: data.id,
        },
      })
      .exec()
      .then((docs) => {
        for (const doc of docs) {
          doc.incrementalModify((docData) => {
            docData.brackets = docData.brackets.filter((id) => id != data.id)
            return docData
          })
        }
      })
  }, false)
  // When bracket removed, also remove it's rounds
  collections.brackets.postRemove((data) => {
    return collections.rounds.bulkRemove(data.rounds)
  }, false)

  // When removing round, also remove it's ID from brackets
  collections.rounds.preRemove((data) => {
    return collections.brackets
      .find({
        selector: {
          rounds: data.id,
        },
      })
      .exec()
      .then((docs) => {
        for (const doc of docs) {
          doc.incrementalModify((docData) => {
            docData.rounds = docData.rounds.filter((id) => id != data.id)
            return docData
          })
        }
      })
  }, false)
  // When round removed, also remove it's games
  collections.rounds.postRemove((data) => {
    return collections.games.bulkRemove(data.games)
  }, false)

  // When removing game, also remove it's ID from rounds
  collections.games.preRemove((data) => {
    return collections.rounds
      .find({
        selector: {
          games: data.id,
        },
      })
      .exec()
      .then((docs) => {
        for (const doc of docs) {
          doc.incrementalModify((docData) => {
            docData.games = docData.games.filter((id) => id != data.id)
            return docData
          })
        }
      })
  }, false)
  // When game removed, also remove it's scores
  collections.games.postRemove((data) => {
    return collections.scores.bulkRemove(data.scores)
  }, false)

  // When removing score, also remove it's ID from games
  collections.scores.preRemove((data) => {
    return collections.games
      .find({
        selector: {
          scores: data.id,
        },
      })
      .exec()
      .then((docs) => {
        for (const doc of docs) {
          doc.incrementalModify((docData) => {
            docData.scores = docData.scores.filter((id) => id != data.id)
            return docData
          })
        }
      })
  }, false)

  // When removing member, also remove it's ID from teams
  collections.members.preRemove((data) => {
    return collections.teams
      .find({
        selector: {
          members: data.id,
        },
      })
      .exec()
      .then((docs) => {
        for (const doc of docs) {
          doc.incrementalModify((docData) => {
            docData.members = docData.members.filter((id) => id != data.id)
            return docData
          })
        }
      })
  }, false)

  // When removing team, also remove any scores associated with it
  collections.teams.preRemove((data) => {
    return collections.scores
      .find({
        selector: {
          team: data.id,
        },
      })
      .exec()
      .then(async (docs) => {
        for (const doc of docs) {
          await doc.incrementalRemove()
        }
      })
  }, false)
}

export default initMiddleware
