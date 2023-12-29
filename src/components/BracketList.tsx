import { BracketDocument, TournamentDocument } from '../db/types'

type BracketListProps = {
  brackets: BracketDocument[]
  className?: string
  readOnly?: boolean
  tournament?: TournamentDocument
  showEditButton?: boolean
}

BracketList.defaultProps = {
  readOnly: true,
  className: '',
}

function BracketList({
  brackets,
  className,
  readOnly,
  tournament,
  showEditButton,
}: BracketListProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {brackets.map((bracket) => (
        /*<Bracket
          key={bracket.id}
          bracket={bracket}
          readOnly={readOnly}
          showEditButton={showEditButton}
          tournament={tournament}
        />*/
        <span key={bracket.id}>{bracket.type}</span>
      ))}
    </div>
  )
}

export default BracketList
