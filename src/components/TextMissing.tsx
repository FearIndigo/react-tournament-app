import { XMarkIcon } from '@heroicons/react/24/outline'

type TextMissingProps = {
  text?: string
  className?: string
}

TextMissing.defaultProps = {
  text: 'missing!',
  className: '',
}

function TextMissing({ text, className }: TextMissingProps) {
  return (
    <div
      className={`flex animate-pulse items-center space-x-1 text-red-500 ${className}`}
    >
      <div className='aspect-square h-full  rounded-full bg-red-500 p-1'>
        <XMarkIcon className='text-red-200' />
      </div>
      <span className='truncate'>{text}</span>
    </div>
  )
}

export default TextMissing
