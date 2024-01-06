import {
  ChangeEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { v4 as uuidv4 } from 'uuid'

type NumberInputProps = {
  value: number
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
  focusOnRender?: boolean
}

NumberInput.defaultProps = {
  className: '',
}

function NumberInput({
  value,
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
  focusOnRender,
}: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
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

  useEffect(() => {
    if (!focusOnRender) return
    inputRef.current?.focus()
  }, [focusOnRender, inputRef])

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
          ref={inputRef}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleOnChange}
          className={`bg-100 h-8 truncate rounded-3xl px-2 shadow-inner ring-1 ring-current ${className}`}
          type='number'
          min={min}
          max={max}
          step={step}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      )}
    </>
  )
}

export default NumberInput
