import { memo, useState } from 'react'
import { MicrophoneIcon, SendIcon } from '../Icons'

const INPUT_CONTAINER_STYLE = { borderColor: '#E0E0E0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' } as const
const BTN_BG_STYLE = { backgroundColor: '#0095DA' } as const

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && onSend) {
      onSend(message.trim())
      setMessage('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 bg-white border-t border-gray-200 ${className}`}
    >
      <div
        className="flex items-center gap-2 w-full rounded-full bg-white border border-gray-300 px-1.5 py-1.5 shadow-sm"
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
          className="relative w-10 h-10 flex items-center justify-center text-white rounded-full hover:opacity-90 transition-opacity overflow-hidden shrink-0"
          style={BTN_BG_STYLE}
        >
          {voiceActive && voiceSlot ? (
            <div className="absolute inset-0 w-full h-full min-w-[40px] min-h-[40px]">
              {voiceSlot}
            </div>
          ) : (
            <MicrophoneIcon className="w-5 h-5" />
          )}
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          dir="rtl"
          className="flex-1 min-w-0 px-3 py-2 bg-transparent border-0 focus:outline-none focus:ring-0 text-right text-gray-800 placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="w-10 h-10 flex items-center justify-center text-white rounded-full hover:opacity-90 transition-opacity shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          style={BTN_BG_STYLE}
          aria-label="ارسال"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
    </form>
  )
}

export default memo(InputField)
