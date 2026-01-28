import { useTheme } from '../../hooks/useTheme'
import { ChatBubbleIcon } from '../Icons'

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
  className = '',
}: HistoryItemProps) {
  const { textClass, textSecondaryClass, borderClass } = useTheme()

  return (
    <div className={`flex items-center gap-3 py-3 ${borderClass} ${className}`}>
      <ChatBubbleIcon className="w-[10px] h-[12px] flex-shrink-0" />

      <div className="flex-1">
        <p className={`${textClass} text-xs font-light`}>{text}</p>
        {date && <p className={`${textSecondaryClass} text-xs mt-1`}>{date}</p>}
      </div>
    </div>
  )
}

export default HistoryItem
