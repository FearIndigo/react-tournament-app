import { ChangeEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type DatalistInputProps = {
  value: string
  options: [value: string, label: string][]
  placeholder?: string
  className?: string
  onChange: (newOption: [value: string, label: string]) => void
}

DatalistInput.defaultProps = {
  className: '',
}

function DatalistInput({
  value,
  options,
  placeholder,
  className,
  onChange,
}: DatalistInputProps) {
  const [inputValue, setInputValue] = useState(value)

  const datalistId = uuidv4()

  useEffect(() => {
    setInputValue(value)
  }, [value])

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    // NOTE: When multiple options have the same label only the first one can be chosen when selecting via label
    const selectedOption = options.find(
      (option) => option[0] == e.target.value || option[1] == e.target.value
    )
    const selectedValue = selectedOption ? selectedOption[0] : ''
    const selectedLabel = selectedOption ? selectedOption[1] : e.target.value
    setInputValue(selectedLabel)
    onChange([selectedValue, selectedLabel])
  }

  return (
    <>
      <input
        value={inputValue}
        placeholder={placeholder}
        onChange={handleOnChange}
        className={`h-8 grow truncate rounded-3xl bg-white/50 p-2 shadow-inner ring-1 ring-current ${className}`}
        list={datalistId}
      />
      <datalist id={datalistId}>
        {options.map((option, index) => (
          <option key={`${index}-${option[0]}`} value={option[0]}>
            {option[1]}
          </option>
        ))}
      </datalist>
    </>
  )
}

export default DatalistInput
