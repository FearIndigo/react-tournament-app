import { CheckIcon, PencilIcon } from '@heroicons/react/24/outline'

type EditModeToggleProps = {
  editModeOff: boolean
  title?: string
  onChange: (editModeOff: boolean) => void
}

EditModeToggle.defaultProps = {
  title: 'Toggle edit mode',
}

function EditModeToggle({ editModeOff, title, onChange }: EditModeToggleProps) {
  return (
    <div className='relative'>
      {!editModeOff && (
        <span className='absolute left-1 top-1 h-6 w-6 animate-ping rounded-full bg-blue-400' />
      )}
      <button
        title={title}
        className={`relative z-10 h-8 w-8 rounded-3xl  p-2 shadow ${
          editModeOff ? 'bg-100 text-violet-800' : 'bg-blue-400 text-blue-800'
        }`}
        onClick={() => onChange(!editModeOff)}
      >
        {editModeOff ? <PencilIcon /> : <CheckIcon />}
      </button>
    </div>
  )
}

export default EditModeToggle
