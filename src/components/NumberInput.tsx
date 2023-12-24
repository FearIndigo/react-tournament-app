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
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    let inputValue = e.target.value
    if (e.target.value == '') inputValue = '0'
    const newValue = parseInt(inputValue)
    if (isNaN(newValue)) return
    setInputValue(newValue)
    onChange(newValue)
  }

  return (
    <input
      value={inputValue}
      placeholder={placeholder}
      onChange={handleOnChange}
      className={`h-8 grow truncate rounded-3xl bg-white/50 p-2 shadow-inner ring-1 ring-current ${className}`}
      type='number'
      min={min}
      max={max}
    />
  )
}

export default NumberInput
