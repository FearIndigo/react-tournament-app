import { BracketDocument } from '../db/types'
import RemoveButton from './RemoveButton'

type RemoveBracketButtonProps = {
  bracket: BracketDocument
  title?: string
}

RemoveBracketButton.defaultProps = {
  title: 'Remove bracket',
}

function RemoveBracketButton({ bracket, title }: RemoveBracketButtonProps) {
  function removeBracket() {
    bracket.remove()
  }

  return <RemoveButton title={title} onClick={removeBracket} />
}

export default RemoveBracketButton
