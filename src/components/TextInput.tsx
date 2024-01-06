import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type TextInputProps = {
  value: string
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
  onChange: (newValue: string) => void
}

TextInput.defaultProps = {
  className: '',
}

function TextInput({
  value,
  placeholder,
  label,
  disabled,
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

  const inputId = useMemo(() => uuidv4(), [])

  return (
    <>
      {label && (
        <label htmlFor={inputId} className='mx-2'>
          {label}
        </label>
      )}
      {disabled ? (
        <span
          className={`bg-300 flex h-8 items-center truncate rounded-3xl px-2 shadow-inner ring-1 ring-current ${className}`}
        >
          {inputValue}
        </span>
      ) : (
        <input
          id={inputId}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleOnChange}
          className={`bg-100 h-8 truncate rounded-3xl px-2 shadow-inner ring-1 ring-current ${className}`}
        />
      )}
    </>
  )
}

export default TextInput
