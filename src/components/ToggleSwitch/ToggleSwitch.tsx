import { useTheme } from '../../hooks/useTheme'

interface ToggleSwitchProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
  labelClassName?: string
  fontSize?: number
}

function ToggleSwitch({
  label,
  checked,
  onChange,
  className = '',
  labelClassName,
  fontSize,
}: ToggleSwitchProps) {
  const { textClass, borderClass, fontSize: themeFontSize } = useTheme()

  const labelClasses = labelClassName
    ? `${textClass} ${labelClassName}`
    : textClass

  const currentFontSize = fontSize ?? themeFontSize
  const labelStyle = { fontSize: `${currentFontSize * 0.875}px` }

  const trackStyle = checked
    ? { backgroundColor: '#0095DA', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }
    : {
        backgroundColor: '#D2DEDE',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.25)',
      }
  const handleStyle = {
    backgroundColor: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  }

  return (
    <div
      className={`flex items-center justify-between py-4 ${borderClass} ${className}`}
    >
      <span className={labelClasses} style={labelStyle}>
        {label}
      </span>
      <button
        type="button"
        dir="ltr"
        onClick={() => onChange(!checked)}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200"
        style={trackStyle}
      >
        <div
          className={`flex h-full w-full items-center transition-all duration-200 ${
            checked ? 'justify-end' : 'justify-start'
          }`}
        >
          <span
            className="inline-block h-4 w-4 rounded-full mx-0.5 transition-all duration-200"
            style={handleStyle}
          />
        </div>
      </button>
    </div>
  )
}

export default ToggleSwitch
