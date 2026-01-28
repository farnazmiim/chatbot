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
      <div 
        className="bg-[#0095DA] rounded-tl-[20px] rounded-br-[20px] rounded-bl-[20px] px-4 py-3 max-w-[80%]"
        style={{ boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)' }}
      >
        <p className="text-white text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

export default ChatBubble
