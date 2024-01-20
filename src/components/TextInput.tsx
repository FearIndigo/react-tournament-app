import { ChangeEvent, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

type TextInputProps = {
  value: string
  inputMode?:
    | 'search'
    | 'text'
    | 'email'
    | 'tel'
    | 'url'
    | 'numeric'
    | 'none'
    | 'decimal'
    | undefined
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
  onChange: (newValue: string) => void
}

TextInput.defaultProps = {
  inputMode: 'text',
  className: '',
}

function TextInput({
  value,
  inputMode,
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
      <div className={`rounded-3xl shadow ${className}`}>
        {disabled ? (
          <span className='bg-300 input'>{value}</span>
        ) : (
          <input
            id={inputId}
            type='text'
            inputMode={inputMode}
            value={value}
            placeholder={placeholder}
            onChange={handleOnChange}
            className='bg-100 input'
          />
        )}
      </div>
    </>
  )
}

export default TextInput
