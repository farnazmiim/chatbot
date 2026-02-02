import { CameraIcon, AudioWaveIcon, MessageIcon } from '../Icons'

export type ChatMode = 'video' | 'voice' | 'chat'

interface ChatModeBarProps {
  mode: ChatMode
  onModeChange: (mode: ChatMode) => void
  compact?: boolean
}

function ChatModeBar({ mode, onModeChange, compact = false }: ChatModeBarProps) {
  return (
    <div
      className={`flex justify-center shrink-0 ${compact ? 'py-0' : 'pt-4 pb-3'}`}
      dir="ltr"
    >
      <div className="relative flex w-[180px] h-[50px] rounded-full bg-gray-200">
        <div
          className="absolute top-[1px] w-[52px] h-[48px] rounded-full transition-[right] duration-200"
          style={{
            backgroundColor: '#0095DA',
            right:
              mode === 'chat' ? '1px' : mode === 'voice' ? '61px' : '121px',
          }}
          aria-hidden
        />
        <button
          type="button"
          onClick={() => onModeChange('video')}
          className={`flex-1 flex items-center justify-center transition-colors relative z-10 ${
            mode === 'video'
              ? 'text-white'
              : 'text-gray-600 hover:bg-gray-300/50'
          }`}
          aria-label="حالت ویدیو"
        >
          <CameraIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => onModeChange('voice')}
          className={`flex-1 flex items-center justify-center transition-colors relative z-10 ${
            mode === 'voice'
              ? 'text-white'
              : 'text-gray-600 hover:bg-gray-300/50'
          }`}
          aria-label="حالت صدا"
        >
          <AudioWaveIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => onModeChange('chat')}
          className={`flex-1 flex items-center justify-center transition-colors relative z-10 ${
            mode === 'chat'
              ? 'text-white'
              : 'text-gray-600 hover:bg-gray-300/50'
          }`}
          aria-label="حالت چت"
          aria-current={mode === 'chat'}
        >
          <MessageIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default ChatModeBar
