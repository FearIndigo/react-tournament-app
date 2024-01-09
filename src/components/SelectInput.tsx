import { ChangeEvent, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

type SelectInputProps = {
  value: string
  options: [value: string, label: string][]
  placeholder?: string
  label?: string
  className?: string
  onChange: (newOption: [value: string, label: string]) => void
}

SelectInput.defaultProps = {
  placeholder: 'Choose Option:',
  className: '',
}

function SelectInput({
  value,
  options,
  placeholder,
  label,
  className,
  onChange,
}: SelectInputProps) {
  function handleOnChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange(options[e.target.selectedIndex - 1])
  }

  const inputId = useMemo(() => uuidv4(), [])

  return (
    <>
      {label && (
        <label htmlFor={inputId} className='mx-2'>
          {label}
        </label>
      )}
      <div className={`rounded-3xl shadow ${className}`}>
        <div className='relative w-full'>
          <select
            id={inputId}
            value={value}
            className='bg-100 input relative pr-8'
            onChange={handleOnChange}
          >
            <option value='' disabled>
              {placeholder}
            </option>
            {options.map((option, index) => (
              <option key={`${index}-${option[0]}`} value={option[0]}>
                {option[1]}
              </option>
            ))}
          </select>
          <ChevronDownIcon className='pointer-events-none absolute right-2 top-2 h-4 w-4' />
        </div>
      </div>
    </>
  )
}

export default SelectInput
