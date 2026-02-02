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
  return (
    <div className={`flex items-center gap-3 py-2 ${className}`}>
      <ChatBubbleIcon className="w-[10px] h-[12px] flex-shrink-0" />

      <div className="flex-1 min-w-0">
        <p className="text-gray-800 font-normal text-xs leading-relaxed">{text}</p>
        {date && <p className="text-gray-600 text-xs mt-1">{date}</p>}
      </div>
    </div>
  )
}

export default HistoryItem
