import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

type AccordionOpenToggleProps = {
  open?: boolean
  title?: string
  onChange: (isOpen: boolean) => void
}

AccordionOpenToggle.defaultProps = {
  title: 'Toggle accordion open',
}

function AccordionOpenToggle({
  open,
  title,
  onChange,
}: AccordionOpenToggleProps) {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  function toggleIsOpen() {
    onChange(!isOpen)
    setIsOpen(!isOpen)
  }

  return (
    <button
      title={title}
      className='h-8 w-8 rounded-3xl bg-blue-100 p-2 shadow'
      onClick={toggleIsOpen}
    >
      <ChevronDownIcon
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
      />
    </button>
  )
}

export default AccordionOpenToggle
