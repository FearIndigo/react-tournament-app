import { ChangeEvent, useState } from 'react'

type TextInputProps = {
  value: string
  placeholder?: string
  onChange: (newValue: string) => void
  className?: string
}

function TextInput({
  value,
  placeholder,
  onChange,
  className,
}: TextInputProps) {
  const [inputValue, setInputValue] = useState(value)

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <input
      value={inputValue}
      placeholder={placeholder}
      onChange={handleOnChange}
      className={`w-full rounded-lg bg-white bg-opacity-50 p-1 shadow ${className}`}
    />
  )
}

export default TextInput
