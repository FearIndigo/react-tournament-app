import { BracketDocument } from '../db/types'
import RemoveButton from './RemoveButton.tsx'

type RemoveBracketButtonProps = {
  bracket: BracketDocument
  title?: string
}

RemoveBracketButton.defaultProps = {
  title: 'Remove bracket',
}

function RemoveBracketButton({ bracket, title }: RemoveBracketButtonProps) {
  function removeTournament() {
    bracket.remove()
  }

  return <RemoveButton title={title} onClick={removeTournament} />
}

export default RemoveBracketButton
