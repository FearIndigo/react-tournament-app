import { useState } from 'react'

type TabButtonsProps = {
  tabs: string[]
  defaultTabIndex?: number
  onChanged: (tabIndex: number) => void
  className?: string
}

function TabButtons({
  tabs,
  defaultTabIndex,
  onChanged,
  className,
}: TabButtonsProps) {
  const [tabIndex, setTabIndex] = useState(defaultTabIndex ?? 0)

  function updateTabIndex(index: number) {
    setTabIndex(index)
    onChanged(index)
  }

  return (
    <div className={`bg-300 rounded-full p-1 text-violet-800 ${className}`}>
      <div
        className='relative grid h-10'
        style={{ gridTemplateColumns: `repeat(${tabs.length},1fr)` }}
      >
        <span
          className='bg-100 absolute left-0 top-0 h-full rounded-full shadow transition-transform'
          style={{
            transform: `translateX(${tabIndex * 100}%)`,
            width: `${(1 / tabs.length) * 100}%`,
            display: tabIndex < 0 ? 'none' : 'block',
          }}
        ></span>
        {tabs.map((tab, index) => (
          <div key={index} className='relative truncate'>
            <input
              type='radio'
              id={`tab-button-${index}`}
              name={`tab-buttons`}
              onChange={() => updateTabIndex(index)}
              className='hidden'
            />
            <label
              htmlFor={`tab-button-${index}`}
              className={`tap-none flex h-full w-full cursor-pointer items-center justify-center truncate px-3 text-center font-bold leading-none ${
                index == tabIndex ? '' : ''
              }`}
            >
              {tab}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TabButtons
