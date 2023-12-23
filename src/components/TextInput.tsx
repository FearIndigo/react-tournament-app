import { ChangeEvent, useEffect, useState } from 'react'

type TextInputProps = {
  value: string
  placeholder?: string
  className?: string
  onChange: (newValue: string) => void
}

TextInput.defaultProps = {
  className: '',
}

function TextInput({
  value,
  placeholder,
  className,
  onChange,
}: TextInputProps) {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <input
      value={inputValue}
      placeholder={placeholder}
      onChange={handleOnChange}
      className={`h-8 grow truncate rounded-3xl bg-white/50 p-2 shadow-inner ring-1 ring-current ${className}`}
    />
  )
}

export default TextInput
