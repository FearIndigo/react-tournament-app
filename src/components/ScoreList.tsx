import { GameDocument, ScoreDocument } from '../db/types'
import Score from './Score.tsx'

type ScoreListProps = {
  scores: ScoreDocument[]
  game?: GameDocument
  className?: string
  readOnly?: boolean
}

ScoreList.defaultProps = {
  readOnly: true,
  className: '',
}

function ScoreList({ scores, game, className, readOnly }: ScoreListProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {scores.map((score) => (
        <Score key={score.id} score={score} game={game} readOnly={readOnly} />
      ))}
    </div>
  )
}

export default ScoreList
