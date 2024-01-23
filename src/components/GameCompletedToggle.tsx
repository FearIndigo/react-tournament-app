import {
  LockClosedIcon,
  LockOpenIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'

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
      className={`h-8 w-8 rounded-3xl p-2 text-violet-800 shadow ${
        completed ? 'bg-300 text-violet-100' : 'bg-100'
      }`}
      onClick={() => onChange(!completed)}
    >
      {completed ? <LockClosedIcon /> : <LockOpenIcon />}
    </button>
  )
}

export default GameCompletedToggle
