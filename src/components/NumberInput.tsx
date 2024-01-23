import {
  ChangeEvent,
  FocusEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { usePropState } from '../hooks.tsx'

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
  const [internalValue, setInternalValue] = usePropState<string>(
    value.toString()
  )

  useEffect(() => {
    if (!focused) return
    inputRef.current?.focus()
  }, [focused, inputRef])

  const inputId = useMemo(() => uuidv4(), [])

  function tryGetValidNumber(input: string) {
    const inputStep = step ?? 1
    return Math.min(
      max ?? Infinity,
      Math.max(
        min ?? -Infinity,
        Math.round(parseFloat(input) / inputStep) * inputStep
      )
    )
  }

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const num = tryGetValidNumber(e.target.value)
    if (isNaN(num)) {
      setInternalValue(e.target.value)
    } else {
      setInternalValue(num.toString())
      onChange(num)
    }
  }

  function handleOnBlur(e: FocusEvent<HTMLInputElement>) {
    if (isNaN(parseFloat(e.target.value))) {
      const num = tryGetValidNumber('0')
      setInternalValue(num.toString())
      onChange(num)
    }

    if (!onBlur) return
    onBlur(e)
  }

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
            value={internalValue}
            placeholder={placeholder}
            onChange={handleOnChange}
            className='bg-100 input'
            min={min}
            max={max}
            step={step}
            onKeyDown={onKeyDown}
            onBlur={handleOnBlur}
          />
        )}
      </div>
    </>
  )
}

export default NumberInput
