import { type ReactNode } from 'react'
import { SpeakerIcon, CopyIcon, DislikeIcon, LikeIcon } from '../Icons'

interface ChatBubbleProps {
  children: ReactNode
  isUser?: boolean
  className?: string
}

function ChatBubble({ children, isUser = false, className = '' }: ChatBubbleProps) {
  if (isUser) {
    return (
      <div className={`flex justify-start mb-4 ${className}`} dir="rtl">
        <div className="bg-[#0095DA] rounded-tl-[20px] rounded-br-[20px] rounded-bl-[20px] px-4 py-3 max-w-[80%]">
          <p className="text-white text-sm leading-relaxed">{children}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex justify-end mb-4 ${className}`} dir="rtl">
      <div
        className="rounded-tr-[15px] rounded-br-[15px] rounded-bl-[15px] px-4 py-3 max-w-[80%]"
        style={{ backgroundColor: '#F3F4F6' }}
      >
        <p className="text-gray-800 text-sm leading-relaxed">{children}</p>
        <div className="flex items-center justify-end gap-3 mt-2 pt-2 border-t border-gray-200" dir="rtl" style={{ color: '#071465' }}>
          <button type="button" className="p-1 hover:opacity-80 transition-opacity" aria-label="پخش صدا">
            <SpeakerIcon className="w-[11px] h-[11px]" />
          </button>
          <button type="button" className="p-1 hover:opacity-80 transition-opacity" aria-label="کپی">
            <CopyIcon className="w-[11px] h-[11px]" />
          </button>
          <button type="button" className="p-1 hover:opacity-80 transition-opacity" aria-label="منفی">
            <DislikeIcon className="w-[11px] h-[11px]" />
          </button>
          <button type="button" className="p-1 hover:opacity-80 transition-opacity" aria-label="مثبت">
            <LikeIcon className="w-[11px] h-[11px]" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBubble
