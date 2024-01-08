import { TrophyIcon } from '@heroicons/react/24/outline'

type GameCompletedToggleProps = {
  completed: boolean
  title?: string
  onChange: (isOpen: boolean) => void
}

GameCompletedToggle.defaultProps = {
  title: 'Toggle game completed',
}

function GameCompletedToggle({
  completed,
  title,
  onChange,
}: GameCompletedToggleProps) {
  return (
    <button
      title={title}
      className={`h-8 w-8 rounded-3xl p-2 shadow ${
        completed ? 'bg-yellow-200 text-yellow-800' : 'bg-100 text-violet-800'
      }`}
      onClick={() => onChange(!completed)}
    >
      <TrophyIcon />
    </button>
  )
}

export default GameCompletedToggle
