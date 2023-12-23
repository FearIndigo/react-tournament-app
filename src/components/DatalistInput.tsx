import { ChangeEvent, useEffect, useState } from 'react'

type DatalistInputProps = {
  value: string
  options: [value: string, label: string][]
  placeholder?: string
  className?: string
  onChange: (newValue: string) => void
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

  const id = crypto.randomUUID()

  useEffect(() => {
    setInputValue(value)
  }, [value])

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <>
      <input
        value={inputValue}
        placeholder={placeholder}
        onChange={handleOnChange}
        className={`w-full truncate rounded-3xl bg-white/50 p-2 shadow-inner ring-1 ring-current ${className}`}
        list={id}
      />
      <datalist id={id}>
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
