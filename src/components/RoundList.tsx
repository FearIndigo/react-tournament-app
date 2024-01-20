import { BracketDocument, RoundDocument } from '../db/types'
import Round from './Round'

type RoundListProps = {
  rounds: RoundDocument[]
  className?: string
  readOnly?: boolean
  bracket?: BracketDocument
}

RoundList.defaultProps = {
  className: '',
}

function RoundList({ rounds, className, readOnly, bracket }: RoundListProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {rounds.map((round) => (
        <Round
          key={round.id}
          round={round}
          bracket={bracket}
          readOnly={readOnly}
        />
      ))}
    </div>
  )
}

export default RoundList
