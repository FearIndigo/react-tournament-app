import { Fragment, useState } from 'react'

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
    <div
      className={`bg-300 rounded-full p-1 text-violet-800 shadow ${className}`}
    >
      <div className='relative flex h-10 items-center justify-center'>
        {tabs.map((tab, index) => (
          <Fragment key={index}>
            <input
              type='radio'
              id={`tab-button-${index}`}
              name={`tab-buttons`}
              onChange={() => updateTabIndex(index)}
              className='hidden'
            />
            <label
              htmlFor={`tab-button-${index}`}
              className={`tap-none relative z-10 flex h-full w-20 cursor-pointer items-center justify-center p-2 text-center font-bold leading-none transition-colors ${
                index == tabIndex ? '' : ''
              }`}
            >
              {tab}
            </label>
          </Fragment>
        ))}
        <span
          className='bg-100 absolute left-0 h-full w-20 rounded-full shadow transition-transform'
          style={{ transform: `translateX(${tabIndex * 100}%)` }}
        ></span>
      </div>
    </div>
  )
}

export default TabButtons
