import { GameDocument, ScoreDocument } from '../db/types'
import Score from './Score.tsx'

type ScoreListProps = {
  scores: ScoreDocument[]
  className?: string
  readOnly?: boolean
  game?: GameDocument
  showEditButton?: boolean
}

ScoreList.defaultProps = {
  readOnly: true,
  className: '',
}

function ScoreList({
  scores,
  className,
  readOnly,
  showEditButton,
}: ScoreListProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {scores.map((score) => (
        <Score
          key={score.id}
          score={score}
          readOnly={readOnly}
          showEditButton={showEditButton}
        />
      ))}
    </div>
  )
}

export default ScoreList
