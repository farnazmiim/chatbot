import { useState } from 'react'
import { MicrophoneIcon } from '../Icons'

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
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onVoiceClick?.()
        }}
        className="relative w-12 h-12 flex items-center justify-center bg-primary-blue text-white rounded-lg hover:bg-opacity-90 transition-colors overflow-hidden shrink-0"
      >
        {voiceActive && voiceSlot ? (
          <div className="absolute inset-0 w-full h-full min-w-[48px] min-h-[48px]">
            {voiceSlot}
          </div>
        ) : (
          <MicrophoneIcon />
        )}
      </button>
    </form>
  )
}

export default InputField
