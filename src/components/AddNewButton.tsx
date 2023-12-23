import { PlusIcon } from '@heroicons/react/24/outline'

type AddNewButtonProps = {
  title?: string
  onClick: () => void
}

AddNewButton.defaultProps = {
  title: 'Add new',
}

function AddNewButton({ title, onClick }: AddNewButtonProps) {
  return (
    <button
      title={title}
      className='h-8 w-8 rounded-3xl bg-blue-100 p-2 shadow'
      onClick={onClick}
    >
      <PlusIcon />
    </button>
  )
}

export default AddNewButton
