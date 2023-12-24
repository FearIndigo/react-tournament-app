import { ScoreDocument } from '../db/types'
import RemoveButton from './RemoveButton.tsx'

type RemoveScoreButtonProps = {
  score: ScoreDocument
  title?: string
}

RemoveScoreButton.defaultProps = {
  title: 'Remove score',
}

function RemoveScoreButton({ score, title }: RemoveScoreButtonProps) {
  function removeScore() {
    score.remove()
  }

  return <RemoveButton title={title} onClick={removeScore} />
}

export default RemoveScoreButton
