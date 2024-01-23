import { useRive } from '@rive-app/react-canvas-lite'
import trophy from '../assets/trophy.riv?url'

type TrophyProps = {
  className?: string
}

Trophy.defaultProps = {
  className: '',
}

function Trophy({ className }: TrophyProps) {
  const { rive, RiveComponent } = useRive({
    src: trophy,
    autoplay: true,
  })

  function tryPlay() {
    if (!rive) return
    rive.stop('wobble')
    rive.play('wobble')
  }

  return (
    <RiveComponent
      onClick={tryPlay}
      className={`tap-none cursor-pointer select-none ${className}`}
    />
  )
}

export default Trophy
