import { MinusIcon } from '@heroicons/react/24/outline'

type RemoveButtonProps = {
  title?: string
  onClick: () => void
}

RemoveButton.defaultProps = {
  title: 'Remove',
}

function RemoveButton({ title, onClick }: RemoveButtonProps) {
  return (
    <button
      title={title}
      className='h-8 w-8 rounded-3xl bg-red-300 p-2 text-red-800 shadow'
      onClick={onClick}
    >
      <MinusIcon />
    </button>
  )
}

export default RemoveButton
