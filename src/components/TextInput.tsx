import { ChangeEvent, useEffect, useState } from 'react'

type TextInputProps = {
  value: string
  placeholder?: string
  onChange: (newValue: string) => void
  className?: string
}

TextInput.defaultProps = {
  className: '',
}

function TextInput({
  value,
  placeholder,
  onChange,
  className,
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
      className={`w-full truncate rounded-3xl bg-white bg-opacity-50 p-2 shadow-inner ring-1 ring-current ${className}`}
    />
  )
}

export default TextInput
