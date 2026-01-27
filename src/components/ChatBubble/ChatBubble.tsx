import { type ReactNode } from 'react'

interface ChatBubbleProps {
  children: ReactNode
  isUser?: boolean
  className?: string
}

function ChatBubble({ children, isUser = false, className = '' }: ChatBubbleProps) {
  if (isUser) {
    return (
      <div className={`flex justify-end mb-4 ${className}`}>
        <div className="bg-white border border-gray-200 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] shadow-sm">
          <p className="text-gray-800 text-sm leading-relaxed">{children}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex justify-start mb-4 ${className}`}>
      <div className="bg-[#E8F4F8] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
        <p className="text-gray-800 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

export default ChatBubble
