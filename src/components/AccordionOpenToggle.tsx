import { ChevronDownIcon } from '@heroicons/react/24/outline'

type AccordionOpenToggleProps = {
  open: boolean
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
  return (
    <button
      title={title}
      className='bg-100 h-8 w-8 rounded-3xl p-2 text-violet-800 shadow'
      onClick={() => onChange(!open)}
    >
      <ChevronDownIcon
        className={`transition-all duration-300 ease-in-out ${
          open ? 'rotate-180' : 'rotate-0'
        }`}
      />
    </button>
  )
}

export default AccordionOpenToggle
