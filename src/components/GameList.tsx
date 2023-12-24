import { GameDocument } from '../db/types'
import Game from './Game'

type GameListProps = {
  games: GameDocument[]
  className?: string
  readOnly?: boolean
  showEditButton?: boolean
}

GameList.defaultProps = {
  readOnly: true,
  className: '',
}

function GameList({
  games,
  className,
  readOnly,
  showEditButton,
}: GameListProps) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {games.map((game) => (
        <Game
          key={game.id}
          game={game}
          readOnly={readOnly}
          showEditButton={showEditButton}
        />
      ))}
    </div>
  )
}

export default GameList