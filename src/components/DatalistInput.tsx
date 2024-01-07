import { useCallback } from 'react'
import SelectInput from './SelectInput.tsx'
import TextInput from './TextInput.tsx'

type DatalistInputProps = {
  value: [value: string, label: string]
  options: [value: string, label: string][]
  placeholder?: string
  className?: string
  onChange: (newOption: [value: string, label: string]) => void
}

DatalistInput.defaultProps = {
  className: '',
}

function DatalistInput({
  value,
  options,
  placeholder,
  className,
  onChange,
}: DatalistInputProps) {
  const getSelectedOption = useCallback(
    (input: string): [value: string, label: string] => {
      // NOTE: When multiple options have the same label only the first one can be chosen when selecting via label
      // Find via value first
      let option = options.find((option) => option[0] == input)
      // Find via label second
      if (option == undefined) {
        option = options.find((option) => option[1] == input)
      }

      return option ? option : [input, input]
    },
    [options]
  )

  function textInputOnChange(newValue: string) {
    onChange(getSelectedOption(newValue))
  }

  function selectInputOnChange(newOption: [value: string, label: string]) {
    if (!options.includes(newOption)) return
    onChange(newOption)
  }

  const filteredOptions =
    value[1] == ''
      ? options
      : options.filter((option) =>
          option[1].toLowerCase().includes(value[1].toLowerCase())
        )

  return (
    <div className={`relative flex h-8 ${className}`}>
      <TextInput
        value={value[1]}
        placeholder={placeholder}
        onChange={textInputOnChange}
        className='relative z-10 mr-4 w-full ring-0'
      />
      <SelectInput
        onChange={selectInputOnChange}
        options={filteredOptions}
        value={value[0]}
        className='absolute left-0 w-full'
      />
    </div>
  )
}

export default DatalistInput
