import Creator from './Creator'

type CreatorScreenProps = {
  className?: string
}

CreatorScreen.defaultProps = {
  className: '',
}

function CreatorScreen({ className }: CreatorScreenProps) {
  return (
    <div className={`container my-4 flex justify-center px-4 ${className}`}>
      <Creator />
    </div>
  )
}

export default CreatorScreen
