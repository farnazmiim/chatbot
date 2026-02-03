import { CameraIcon, AudioWaveIcon, MessageIcon } from '../Icons'
import { useThemeStore } from '../../store/themeStore'

export type ChatMode = 'video' | 'voice' | 'chat'

const CHAT_COLOR_HEX = {
  purple: '#A955A8',
  black: '#1E1E1E',
  cyan: '#3DB3EA',
} as const

interface ChatModeBarProps {
  mode: ChatMode
  onModeChange: (mode: ChatMode) => void
  compact?: boolean
}

function ChatModeBar({ mode, onModeChange, compact = false }: ChatModeBarProps) {
  const chatColor = useThemeStore((s) => s.chatColor)
  const accentColor = CHAT_COLOR_HEX[chatColor]

  return (
    <div
      className={`flex justify-center shrink-0 w-[174px] ${compact ? 'py-0' : 'pt-4 pb-3'}`}
      dir="ltr"
    >
      <div
        className="relative grid grid-cols-3 w-full h-[56px] rounded-full p-2 box-border"
        style={{ backgroundColor: '#D0D0D0CC' }}
      >
        <div
          className="absolute top-2 bottom-2 w-[calc((100%-16px)/3)] rounded-full transition-[left] duration-200"
          style={{
            backgroundColor: accentColor,
            left:
              mode === 'video'
                ? '8px'
                : mode === 'voice'
                  ? 'calc(8px + (100% - 16px) / 3)'
                  : 'calc(8px + (100% - 16px) * 2 / 3)',
          }}
          aria-hidden
        />
        <button
          type="button"
          onClick={() => onModeChange('video')}
          className="w-full h-[40px] min-w-0 flex items-center justify-center transition-colors relative z-10 hover:bg-gray-300/50 rounded-full"
          style={{ color: mode === 'video' ? '#FFFFFF' : '#292D32' }}
          aria-label="حالت ویدیو"
        >
          <CameraIcon size={24} className="block shrink-0" />
        </button>
        <button
          type="button"
          onClick={() => onModeChange('voice')}
          className="w-full h-[40px] min-w-0 flex items-center justify-center transition-colors relative z-10 hover:bg-gray-300/50 rounded-full"
          style={{ color: mode === 'voice' ? '#FFFFFF' : '#292D32' }}
          aria-label="حالت صدا"
        >
          <AudioWaveIcon size={24} className="block shrink-0" />
        </button>
        <button
          type="button"
          onClick={() => onModeChange('chat')}
          className="w-full h-[40px] min-w-0 flex items-center justify-center transition-colors relative z-10 hover:bg-gray-300/50 rounded-full"
          style={{ color: mode === 'chat' ? '#FFFFFF' : '#292D32' }}
          aria-label="حالت چت"
          aria-current={mode === 'chat'}
        >
          <MessageIcon size={24} className="block shrink-0" />
        </button>
      </div>
    </div>
  )
}

export default ChatModeBar
