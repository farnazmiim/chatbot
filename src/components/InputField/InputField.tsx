import { memo, useState, useRef } from 'react'
import { MicrophoneIcon, SendIcon } from '../Icons'
import { useThemeStore } from '../../store/themeStore'

const INPUT_CONTAINER_STYLE = {
  borderColor: '#BFBFBFB0',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  backgroundColor: '#ffffff',
} as const

const CHAT_COLOR_HEX = {
  purple: '#A955A8',
  black: '#1E1E1E',
  cyan: '#3DB3EA',
} as const

interface InputFieldProps {
  placeholder?: string
  onSend?: (message: string) => void
  onVoiceClick?: () => void
  voiceActive?: boolean
  voiceSlot?: React.ReactNode
  className?: string
}

function InputField({
  placeholder = '...',
  onSend,
  onVoiceClick,
  voiceActive = false,
  voiceSlot,
  className = '',
}: InputFieldProps) {
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const chatColor = useThemeStore((s) => s.chatColor)
  const accentColor = CHAT_COLOR_HEX[chatColor]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && onSend) {
      onSend(message.trim())
      setMessage('')
      inputRef.current?.blur()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 bg-white ${className}`}
    >
      <div
        className="flex items-center gap-2 w-full h-[56px] rounded-[16px] border px-1.5 py-1.5 shadow-sm bg-white"
        dir="ltr"
        style={INPUT_CONTAINER_STYLE}
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onVoiceClick?.()
          }}
          className="relative w-10 h-10 flex items-center justify-center text-white rounded-full hover:opacity-90 transition-opacity overflow-hidden shrink-0 transition-colors"
          style={{ backgroundColor: accentColor }}
          aria-label={voiceActive ? 'باز کردن کنترل‌های صدا' : 'فعال کردن حالت صدا'}
          title={voiceActive ? 'کنترل‌های صدا' : 'حالت صدا'}
        >
          {voiceActive && voiceSlot ? (
            <div className="absolute inset-0 w-full h-full min-w-[40px] min-h-[40px]">
              {voiceSlot}
            </div>
          ) : (
            <MicrophoneIcon size={18} className="shrink-0" />
          )}
        </button>
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          dir="rtl"
          aria-label="متن پیام"
          className="flex-1 min-w-0 px-3 py-2 bg-transparent border-0 focus:outline-none focus:ring-0 text-right text-gray-800 placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="w-10 h-10 flex items-center justify-center text-white rounded-full hover:opacity-90 transition-opacity transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: message.trim() ? accentColor : '#D7D7D7',
          }}
          aria-label="ارسال"
        >
          <SendIcon size={18} className="shrink-0" />
        </button>
      </div>
    </form>
  )
}

export default memo(InputField)
