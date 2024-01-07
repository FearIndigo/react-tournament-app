import { InformationCircleIcon } from '@heroicons/react/24/outline'

type TextInfoProps = {
  text?: string
  className?: string
}

TextInfo.defaultProps = {
  text: 'info',
  className: '',
}

function TextInfo({ text, className }: TextInfoProps) {
  return (
    <div>
      <div className={`flex items-center space-x-1 ${className}`}>
        <div className='aspect-square h-full'>
          <InformationCircleIcon />
        </div>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default TextInfo
