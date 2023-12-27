import { ChangeEvent, useEffect, useState } from 'react'

type SelectInputProps = {
  value: string
  options: [value: string, label: string][]
  className?: string
  onChange: (newOption: [value: string, label: string]) => void
}

SelectInput.defaultProps = {
  className: '',
}

function SelectInput({
  value,
  options,
  className,
  onChange,
}: SelectInputProps) {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  function handleOnChange(e: ChangeEvent<HTMLSelectElement>) {
    const selectedOption = options[e.target.selectedIndex]
    setInputValue(selectedOption[0])
    onChange(selectedOption)
  }

  return (
    <select
      value={inputValue}
      className={`h-8 grow truncate rounded-3xl bg-white/50 px-1 shadow-inner ring-1 ring-current ${className}`}
      onChange={handleOnChange}
    >
      {options.map((option, index) => (
        <option key={`${index}-${option[0]}`} value={option[0]}>
          {option[1]}
        </option>
      ))}
    </select>
  )
}

export default SelectInput