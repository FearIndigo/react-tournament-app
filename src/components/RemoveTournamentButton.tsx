import { TournamentDocument } from '../db/types'
import RemoveButton from './RemoveButton.tsx'

type RemoveTournamentButtonProps = {
  tournament: TournamentDocument
  title?: string
}

RemoveTournamentButton.defaultProps = {
  title: 'Remove tournament',
}

function RemoveTournamentButton({
  tournament,
  title,
}: RemoveTournamentButtonProps) {
  function removeTournament() {
    tournament.remove()
  }

  return <RemoveButton title={title} onClick={removeTournament} />
}

export default RemoveTournamentButton
