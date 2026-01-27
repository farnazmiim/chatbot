import { useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'

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
  const { textClass, textSecondaryClass, borderClass } = useTheme()

  // Use prop value if provided (controlled), otherwise use internal state (uncontrolled)
  const value = propValue !== undefined ? propValue : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    if (propValue === undefined) {
      setInternalValue(newValue)
    }
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <div className={`py-4 border-b ${borderClass} ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`${textClass} font-normal`} style={{ fontSize: `${value ?? 16}px` }}>اندازه فونت</span>
      </div>
      <div className="flex items-center gap-4">
        <span className={`text-sm ${textSecondaryClass}`}>A</span>
        <input
          type="range"
          min="12"
          max="24"
          value={value ?? 16}
          onChange={handleChange}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-blue"
        />
        <span className={`text-lg ${textSecondaryClass}`}>A</span>
      </div>
    </div>
  )
}

export default FontSizeSlider
