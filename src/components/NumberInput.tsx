import {
  ChangeEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { v4 as uuidv4 } from 'uuid'

type NumberInputProps = {
  value: number
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
  min?: number
  max?: number
  step?: number
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
  onChange: (newValue: number) => void
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  focused?: boolean
}

NumberInput.defaultProps = {
  inputMode: 'numeric',
  className: '',
}

function NumberInput({
  value,
  inputMode,
  min,
  max,
  step,
  placeholder,
  label,
  disabled,
  className,
  onChange,
  onKeyDown,
  onBlur,
  focused,
}: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    let newValue = parseInt(e.target.value)
    if (isNaN(newValue)) newValue = 0
    onChange(newValue)
  }

  useEffect(() => {
    if (!focused) return
    inputRef.current?.focus()
  }, [focused, inputRef])

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
            ref={inputRef}
            type='number'
            inputMode={inputMode}
            value={value}
            placeholder={placeholder}
            onChange={handleOnChange}
            className='bg-100 input'
            min={min}
            max={max}
            step={step}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
          />
        )}
      </div>
    </>
  )
}

export default NumberInput
