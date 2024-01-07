import { ChangeEvent, useMemo } from 'react'
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
  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
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
          {value}
        </span>
      ) : (
        <input
          id={inputId}
          value={value}
          placeholder={placeholder}
          onChange={handleOnChange}
          className={`bg-100 h-8 truncate rounded-3xl px-2 shadow-inner ring-1 ring-current ${className}`}
        />
      )}
    </>
  )
}

export default TextInput
