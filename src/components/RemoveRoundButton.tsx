import { RoundDocument } from '../db/types'
import RemoveButton from './RemoveButton'

type RemoveBracketButtonProps = {
  round: RoundDocument
  title?: string
}

RemoveBracketButton.defaultProps = {
  title: 'Remove round',
}

function RemoveBracketButton({ round, title }: RemoveBracketButtonProps) {
  function removeRound() {
    round.remove()
  }

  return <RemoveButton title={title} onClick={removeRound} />
}

export default RemoveBracketButton
