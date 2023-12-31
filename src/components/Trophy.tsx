import { useRive } from '@rive-app/react-canvas-lite'

type TrophyProps = {
  className?: string
}

Trophy.defaultProps = {
  className: '',
}

function Trophy({ className }: TrophyProps) {
  const { rive, RiveComponent } = useRive({
    src: '/trophy.riv',
    autoplay: true,
  })

  function tryPlay() {
    rive?.play('wobble')
  }

  return (
    <RiveComponent
      onClick={tryPlay}
      className={`tap-none cursor-pointer select-none ${className}`}
    />
  )
}

export default Trophy
