import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

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
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  function handleOnChange(e: ChangeEvent<HTMLSelectElement>) {
    const selectedOption = options[e.target.selectedIndex - 1]
    setInputValue(selectedOption[0])
    onChange(selectedOption)
  }

  const inputId = useMemo(() => uuidv4(), [])

  return (
    <>
      {label && (
        <label htmlFor={inputId} className='mx-2'>
          {label}
        </label>
      )}
      <select
        id={inputId}
        value={inputValue}
        className={`bg-100 h-8 truncate rounded-3xl px-1 shadow-inner ring-1 ring-current ${className}`}
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
    </>
  )
}

export default SelectInput
