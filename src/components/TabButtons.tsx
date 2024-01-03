import { Fragment, useState } from 'react'

type TabButtonsProps = {
  tabs: string[]
  defaultTabIndex?: number
  onChanged: (tabIndex: number) => void
}

function TabButtons({ tabs, defaultTabIndex, onChanged }: TabButtonsProps) {
  const [tabIndex, setTabIndex] = useState(defaultTabIndex ?? 0)

  function updateTabIndex(index: number) {
    setTabIndex(index)
    onChanged(index)
  }

  return (
    <div className='rounded-full bg-blue-300 p-1 text-blue-800'>
      <div className='relative flex items-center justify-center '>
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
              className={`relative z-10 flex h-full w-32 cursor-pointer items-center justify-center p-2 text-center font-bold leading-none transition-colors ${
                index == tabIndex ? '' : ''
              }`}
            >
              {tab}
            </label>
          </Fragment>
        ))}
        <span
          className='absolute left-0 h-full w-32 rounded-full bg-blue-100 shadow transition-transform'
          style={{ transform: `translateX(${tabIndex * 100}%)` }}
        ></span>
      </div>
    </div>
  )
}

export default TabButtons
