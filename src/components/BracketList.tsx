import { BracketDocument } from '../db/types'
import Bracket from './Bracket.tsx'

type BracketListProps = {
  brackets: BracketDocument[]
  className?: string
  readOnly?: boolean
}

BracketList.defaultProps = {
  className: '',
}

function BracketList({ brackets, className, readOnly }: BracketListProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {brackets.map((bracket) => (
        <Bracket key={bracket.id} bracket={bracket} readOnly={readOnly} />
      ))}
    </div>
  )
}

export default BracketList
