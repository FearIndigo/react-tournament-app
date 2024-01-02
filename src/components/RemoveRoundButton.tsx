import { RoundDocument } from '../db/types'
import RemoveButton from './RemoveButton'

type RemoveRoundButtonProps = {
  round: RoundDocument
  title?: string
}

RemoveRoundButton.defaultProps = {
  title: 'Remove round',
}

function RemoveRoundButton({ round, title }: RemoveRoundButtonProps) {
  function removeRound() {
    round.remove()
  }

  return <RemoveButton title={title} onClick={removeRound} />
}

export default RemoveRoundButton
