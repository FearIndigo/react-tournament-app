import { useRef } from 'react'
import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
  PlayerState,
} from '@dotlottie/react-player'

type TrophyProps = {
  className?: string
}

Trophy.defaultProps = {
  className: '',
}

function Trophy({ className }: TrophyProps) {
  const lottieRef = useRef<DotLottieCommonPlayer>(null)

  function tryPlay() {
    if (lottieRef.current == undefined) return
    if (lottieRef.current.currentState == PlayerState.Playing) return
    lottieRef.current.seek(0)
    lottieRef.current.play()
  }

  return (
    <DotLottiePlayer
      ref={lottieRef}
      src='/trophy.lottie'
      className={`cursor-pointer select-none ${className}`}
      onClick={tryPlay}
      autoplay
    />
  )
}

export default Trophy
