import SpinnerIcon from './SpinnerIcon.tsx'

type TextLoadingProps = {
  className?: string
}

function TextLoading({ className }: TextLoadingProps) {
  return (
    <div className={`flex animate-pulse items-center space-x-1 ${className}`}>
      <div className='aspect-square h-full'>
        <SpinnerIcon className='animate-spin' />
      </div>
      <span>loading...</span>
    </div>
  )
}

export default TextLoading
