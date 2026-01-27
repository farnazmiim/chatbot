import { useTheme } from '../../hooks/useTheme'

interface HistoryItemProps {
  text: string
  date?: string
  checked?: boolean
  onToggle?: (checked: boolean) => void
  className?: string
}

function HistoryItem({
  text,
  date,
  checked = false,
  onToggle,
  className = '',
}: HistoryItemProps) {
  const { textClass, textSecondaryClass, borderClass } = useTheme()

  return (
    <div className={`flex items-center gap-3 py-3 border-b ${borderClass} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onToggle?.(e.target.checked)}
        className="w-5 h-5 text-primary-blue border-gray-300 rounded focus:ring-primary-blue"
      />
      <div className="flex-1">
        <p className={`${textClass} text-xs font-light`}>{text}</p>
        {date && <p className={`${textSecondaryClass} text-xs mt-1`}>{date}</p>}
      </div>
    </div>
  )
}

export default HistoryItem
