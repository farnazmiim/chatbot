import { useState, lazy, Suspense } from 'react'
import ChatModeBar from '../ChatModeBar/ChatModeBar'
import { CHARACTER_IMAGES, CHARACTER_NAMES } from '../../lib/characterImages'
import { useThemeStore } from '../../store/themeStore'

const AudioVisualizer3D = lazy(() => import('../AudioVisualizer3D/AudioVisualizer3D'))
import { CloseIcon, MicrophoneIcon } from '../Icons'

type OverlayMode = 'video' | 'voice'

const PILL_BG_STYLE = { backgroundColor: '#C6C6C64D' }
const BTN_GRAY = 'bg-gray-400/60 hover:bg-gray-400/80'
const VOICE_RING_STYLE = {
  boxShadow:
    '0 16px 48px rgba(0,0,0,0.1), 0 6px 24px rgba(0,0,0,0.06), rgba(135, 206, 250, 0.5) 0 0 60px, rgba(173, 216, 230, 0.4) 0 0 100px, rgba(176, 224, 230, 0.35) 0 0 140px, inset 0 4px 24px rgba(255,255,255,0.15), inset rgba(135, 206, 250, 0.2) 0 0 50px',
  border: '2px solid rgba(135, 206, 250, 0.5)',
  background: 'transparent',
} as const

interface VoiceVideoOverlayProps {
  onClose: () => void
  initialMode?: OverlayMode
}

function VoiceVideoOverlay({ onClose, initialMode = 'voice' }: VoiceVideoOverlayProps) {
  const [overlayMode, setOverlayMode] = useState<OverlayMode>(initialMode)
  const [isMuted, setIsMuted] = useState(false)
  const characterId = useThemeStore((s) => s.characterId)

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white"
      dir="ltr"
    >
      <div className="flex-1 flex flex-col min-h-0">
        <header className="flex items-center justify-between p-4 shrink-0">
          <div className="w-10 h-10 shrink-0" aria-hidden />
          <div className="flex-1 flex justify-center items-center min-w-0 px-1">
            <ChatModeBar
              compact
              mode={overlayMode}
              onModeChange={(m) => {
                if (m === 'chat') onClose()
                if (m === 'video') setOverlayMode('video')
                if (m === 'voice') setOverlayMode('voice')
              }}
            />
          </div>
          <div className="w-10 h-10 shrink-0" aria-hidden />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 min-h-0" aria-label="صفحه ویدئو یا صدا">
          {overlayMode === 'video' ? (
            <>
              <div className="mb-6 flex items-center justify-center">
                <img
                  src={CHARACTER_IMAGES[characterId]}
                  alt={`شخصیت ${CHARACTER_NAMES[characterId]}`}
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
              <p className="text-gray-500 text-sm" dir="rtl">
                ویدئو چت
              </p>
            </>
          ) : (
            <>
              <div
                className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full overflow-hidden mb-6 flex items-center justify-center flex-shrink-0"
                style={VOICE_RING_STYLE}
              >
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center bg-transparent">
                      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#0095DA] border-t-transparent" />
                    </div>
                  }
                >
                  <AudioVisualizer3D
                    useMicrophone
                    isMuted={isMuted}
                    compact={false}
                    hideBackground={true}
                    className="relative w-full h-full rounded-none"
                  />
                </Suspense>
              </div>
              <p className="text-gray-500 text-sm" dir="rtl">
                صدا
              </p>
            </>
          )}
        </main>

        <div className="px-4 pb-6 pt-2">
          <div
            className="flex justify-center items-center gap-4 rounded-full backdrop-blur-md px-4 py-3 shadow-sm w-[184px] mx-auto"
            style={PILL_BG_STYLE}
          >
            <button
              onClick={onClose}
              className={`w-14 h-14 rounded-full ${BTN_GRAY} flex items-center justify-center transition-colors text-white`}
              aria-label="بستن"
            >
              <CloseIcon size={28} />
            </button>
            <button
              onClick={() => setIsMuted((m) => !m)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors text-white ${
                isMuted ? BTN_GRAY : 'bg-[#FF4F00] hover:bg-[#FF9F33]'
              }`}
              aria-label={isMuted ? 'میکروفون خاموش' : 'میکروفون روشن'}
            >
              <MicrophoneIcon size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceVideoOverlay
