import SpinnerIcon from './SpinnerIcon.tsx'

type TextLoadingProps = {
  text?: string
  className?: string
}

TextLoading.defaultProps = {
  text: 'loading...',
  className: '',
}

function TextLoading({ text, className }: TextLoadingProps) {
  return (
    <div>
      <div className={`flex animate-pulse items-center space-x-1 ${className}`}>
        <div className='aspect-square h-full'>
          <SpinnerIcon className='animate-spin' />
        </div>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default TextLoading
