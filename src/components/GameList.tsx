import { GameDocument } from '../db/types'
import Game from './Game'

type GameListProps = {
  games: GameDocument[]
  className?: string
  readOnly?: boolean
  showEditButton?: boolean
  showScores?: boolean
}

GameList.defaultProps = {
  className: '',
}

function GameList({
  games,
  className,
  readOnly,
  showEditButton,
  showScores,
}: GameListProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {games.map((game) => (
        <Game
          key={game.id}
          game={game}
          readOnly={readOnly}
          showEditButton={showEditButton}
          showScores={showScores}
        />
      ))}
    </div>
  )
}

export default GameList
