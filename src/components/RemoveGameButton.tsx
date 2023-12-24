import { GameDocument } from '../db/types'
import RemoveButton from './RemoveButton.tsx'

type RemoveGameButtonProps = {
  game: GameDocument
  title?: string
}

RemoveGameButton.defaultProps = {
  title: 'Remove game',
}

function RemoveGameButton({ game, title }: RemoveGameButtonProps) {
  function removeGame() {
    game.remove()
  }

  return <RemoveButton title={title} onClick={removeGame} />
}

export default RemoveGameButton
