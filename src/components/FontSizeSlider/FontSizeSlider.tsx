import { useState } from 'react'
import PersianNumber from '../PersianNumber/PersianNumber'

interface FontSizeSliderProps {
  value?: number
  onChange?: (value: number) => void
  className?: string
}

function FontSizeSlider({
  value: propValue,
  onChange,
  className = '',
}: FontSizeSliderProps) {
  const [internalValue, setInternalValue] = useState(propValue ?? 16)
  const labelColor = '#1e3a5f'

  const value = propValue !== undefined ? propValue : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const actualValue = parseInt(e.target.value)
    if (propValue === undefined) {
      setInternalValue(actualValue)
    }
    if (onChange) {
      onChange(actualValue)
    }
  }

  const fillPercent = ((value - 12) / (24 - 12)) * 100

  return (
    <div className={`pt-4 pb-1 ${className}`}>
      <div className="flex items-center justify-between mb-3" dir="rtl">
        <span
          style={{
            fontSize: `${value ?? 16}px`,
            color: labelColor,
          }}
        >
          اندازه فونت <PersianNumber>{value ?? 16}</PersianNumber>
        </span>
      </div>
      <div className="flex items-center gap-3" dir="ltr">
        <span
          className="text-xs shrink-0"
          style={{ color: labelColor }}
        >
          A
        </span>
        <input
          type="range"
          min="12"
          max="24"
          value={value}
          onChange={handleChange}
          className="font-size-slider flex-1"
          style={
            { '--fill': `${fillPercent}%` } as React.CSSProperties & {
              '--fill': string
            }
          }
        />
        <span
          className="text-lg shrink-0"
          style={{ color: labelColor }}
        >
          A
        </span>
      </div>
    </div>
  )
}

export default FontSizeSlider
