import { ChangeEvent, useEffect, useState } from 'react'

type NumberInputProps = {
  value: number
  min?: number
  max?: number
  placeholder?: string
  className?: string
  onChange: (newValue: number) => void
}

NumberInput.defaultProps = {
  className: '',
}

function NumberInput({
  value,
  min,
  max,
  placeholder,
  className,
  onChange,
}: NumberInputProps) {
  const [inputValue, setInputValue] = useState<string>(value.toString())

  useEffect(() => {
    setInputValue(value.toString())
  }, [value])

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setInputValue(newValue)
    let newIntValue = parseInt(newValue)
    if (isNaN(newIntValue)) newIntValue = 0
    onChange(newIntValue)
  }

  return (
    <input
      value={inputValue}
      placeholder={placeholder}
      onChange={handleOnChange}
      className={`h-8 truncate rounded-3xl bg-blue-100 px-2 shadow-inner ring-1 ring-current ${className}`}
      type='number'
      min={min}
      max={max}
    />
  )
}

export default NumberInput
