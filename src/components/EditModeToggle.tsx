import { CheckIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

type EditModeToggleProps = {
  readOnly?: boolean
  title?: string
  onChange: (editModeOff: boolean) => void
}

EditModeToggle.defaultProps = {
  readOnly: true,
  title: 'Toggle edit mode',
}

function EditModeToggle({ readOnly, title, onChange }: EditModeToggleProps) {
  const [editModeOff, setEditModeOff] = useState(readOnly)

  useEffect(() => {
    setEditModeOff(readOnly)
  }, [readOnly])

  function toggleEditMode() {
    onChange(!editModeOff)
    setEditModeOff(!editModeOff)
  }

  return (
    <div className='relative'>
      {!editModeOff && (
        <span className='absolute left-1 top-1 h-6 w-6 animate-ping rounded-full bg-blue-100' />
      )}
      <button
        title={title}
        className='relative z-10 h-8 w-8 rounded-3xl bg-blue-100 p-2 shadow'
        onClick={toggleEditMode}
      >
        {editModeOff ? <PencilIcon /> : <CheckIcon />}
      </button>
    </div>
  )
}

export default EditModeToggle
