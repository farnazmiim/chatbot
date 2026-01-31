import { useState } from 'react'
import { MicrophoneIcon, SendIcon } from '../Icons'

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
      className={`flex items-center gap-2 p-4 bg-white border-t border-gray-200 ${className}`}
      dir="ltr"
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onVoiceClick?.()
        }}
        className="relative w-12 h-12 flex items-center justify-center text-white rounded-full hover:opacity-90 transition-opacity overflow-hidden shrink-0"
        style={{ backgroundColor: '#0095DA' }}
      >
        {voiceActive && voiceSlot ? (
          <div className="absolute inset-0 w-full h-full min-w-[48px] min-h-[48px]">
            {voiceSlot}
          </div>
        ) : (
          <MicrophoneIcon />
        )}
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        dir="rtl"
        className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent text-right"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="w-12 h-12 flex items-center justify-center text-white rounded-full hover:opacity-90 transition-opacity shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#0095DA' }}
        aria-label="ارسال"
      >
        <SendIcon className="w-5 h-5" />
      </button>
    </form>
  )
}

export default InputField
