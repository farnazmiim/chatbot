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
  const { textClass, borderClass, isNightMode, fontSize: themeFontSize } = useTheme()
  
  const labelClasses = labelClassName 
    ? `${textClass} ${labelClassName}`
    : textClass
  
  const currentFontSize = fontSize ?? themeFontSize
  const labelStyle = { fontSize: `${currentFontSize * 0.875}px` }
  
  return (
    <div className={`flex items-center justify-between py-4 border-b ${borderClass} ${className}`}>
      <span className={labelClasses} style={labelStyle}>{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked 
            ? 'bg-primary-blue' 
            : isNightMode 
              ? 'bg-gray-600' 
              : 'bg-gray-300'
        }`}
      >
        <div className={`flex h-full w-full items-center transition-all duration-200 ${
          checked ? 'justify-end' : 'justify-start'
        }`}>
          <span
            className={`inline-block h-4 w-4 rounded-full ${
              checked 
                ? 'bg-white' 
                : isNightMode
                  ? 'bg-gray-300'
                  : 'bg-white'
            }`}
          />
        </div>
      </button>
    </div>
  )
}

export default ToggleSwitch
