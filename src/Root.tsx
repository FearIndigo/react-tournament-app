import { useEffect, useState } from 'react'
import { Provider } from 'rxdb-hooks'
import initialize from './db/initialize_db.ts'
import App from './App.tsx'
import { TournamentDatabase } from './db/types/types'

let didInit = false

const Root = () => {
  const [db, setDb] = useState<TournamentDatabase>()

  useEffect(() => {
    if (didInit) return
    didInit = true
    // RxDB instantiation can be asynchronous
    initialize().then(setDb)
  }, [])

  // Until db becomes available, consumer hooks that
  // depend on it will still work, absorbing the delay
  // by setting their state to isFetching:true
  return (
    <Provider db={db}>
      <App />
    </Provider>
  )
}

export default Root
