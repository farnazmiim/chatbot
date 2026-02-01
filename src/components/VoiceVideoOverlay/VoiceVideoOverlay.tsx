import { useState } from 'react'
import Avatar from '../Avatar/Avatar'
import AudioVisualizer3D from '../AudioVisualizer3D/AudioVisualizer3D'
import {
  CloseIcon,
  MessageIcon,
  MicrophoneIcon,
  CameraIcon,
  AudioWaveIcon,
} from '../Icons'

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
}

function VoiceVideoOverlay({ onClose }: VoiceVideoOverlayProps) {
  const [isVideoMode, setIsVideoMode] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-900" dir="ltr">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-center gap-3 px-4 pt-4 pb-2">
          <div
            className="flex items-center gap-2 rounded-full backdrop-blur-md px-3 py-2 shadow-sm"
            style={PILL_BG_STYLE}
          >
            <button
              onClick={() => setIsVideoMode(true)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isVideoMode
                  ? 'bg-[#0095DA] text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/20'
              }`}
              aria-label="دوربین – ویدئو چت"
            >
              <CameraIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsVideoMode(false)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                !isVideoMode
                  ? 'bg-[#0095DA] text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/20'
              }`}
              aria-label="صدا – ویژوالیزیشن"
            >
              <AudioWaveIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 min-h-0">
          {isVideoMode ? (
            <>
              <div className="mb-6 flex items-center justify-center">
                <Avatar type="female" size="lg" />
              </div>
              <p className="text-gray-500 text-sm">ویدئو چت</p>
            </>
          ) : (
            <>
              <div
                className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full overflow-hidden mb-6 flex items-center justify-center flex-shrink-0"
                style={VOICE_RING_STYLE}
              >
                <AudioVisualizer3D
                  useMicrophone
                  isMuted={isMuted}
                  compact={false}
                  hideBackground={true}
                  className="relative w-full h-full rounded-none"
                />
              </div>
              <p className="text-gray-500 text-sm">صدا</p>
            </>
          )}
        </div>

        <div className="px-4 pb-6 pt-2">
          <div
            className="flex justify-center items-center gap-4 rounded-full backdrop-blur-md px-4 py-3 shadow-sm w-fit mx-auto"
            style={PILL_BG_STYLE}
          >
            <button
              onClick={onClose}
              className={`w-14 h-14 rounded-full ${BTN_GRAY} flex items-center justify-center transition-colors text-white`}
              aria-label="بستن"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsMuted((m) => !m)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors text-white ${
                isMuted ? BTN_GRAY : 'bg-[#FF4F00] hover:bg-[#FF9F33]'
              }`}
              aria-label={isMuted ? 'میکروفون خاموش' : 'میکروفون روشن'}
            >
              <MicrophoneIcon className="w-6 h-6" />
            </button>
            <button
              onClick={onClose}
              className={`w-14 h-14 rounded-full ${BTN_GRAY} flex items-center justify-center transition-colors text-white`}
              aria-label="چت"
            >
              <MessageIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceVideoOverlay
