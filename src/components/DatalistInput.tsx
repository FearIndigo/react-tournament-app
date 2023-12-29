import { useCallback, useEffect, useState } from 'react'
import SelectInput from './SelectInput.tsx'
import TextInput from './TextInput.tsx'

type DatalistInputProps = {
  value: string
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
  const [selectedOption, setSelectedOption] = useState<
    [value: string, label: string]
  >([value, value])

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

  useEffect(() => {
    setSelectedOption(getSelectedOption(value))
  }, [getSelectedOption, value])

  function textInputOnChange(newValue: string) {
    const newOption = getSelectedOption(newValue)
    setSelectedOption(newOption)
    onChange(newOption)
  }

  function selectInputOnChange(newOption: [value: string, label: string]) {
    if (!options.includes(newOption)) return
    setSelectedOption(newOption)
    onChange(newOption)
  }

  const filteredOptions =
    selectedOption[1] == ''
      ? options
      : options.filter((option) =>
          option[1].toLowerCase().includes(selectedOption[1].toLowerCase())
        )

  return (
    <div className={`relative flex h-8 w-full ${className}`}>
      <TextInput
        value={selectedOption[1]}
        placeholder={placeholder}
        onChange={textInputOnChange}
        className='relative z-10 mr-4 w-full ring-0'
      />
      <SelectInput
        onChange={selectInputOnChange}
        options={filteredOptions}
        value={selectedOption[0]}
        className='absolute left-0 w-full'
      />
    </div>
  )
}

export default DatalistInput
