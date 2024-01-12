import { CreatorData } from '../creator.ts'
import CreatorBracket from './CreatorBracket.tsx'

type CreatorBracketsProps = {
  data: CreatorData
  onChange: (data: CreatorData) => void
}

function CreatorBrackets({ data, onChange }: CreatorBracketsProps) {
  function updateData(newData: CreatorData) {
    onChange(newData)
  }

  return (
    <>
      {data.brackets.map((_bracketData, bracketIndex) => (
        <CreatorBracket
          key={bracketIndex}
          data={data}
          index={bracketIndex}
          onChange={updateData}
        />
      ))}
    </>
  )
}

export default CreatorBrackets
