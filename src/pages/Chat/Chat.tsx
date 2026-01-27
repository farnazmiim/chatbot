import { useState } from 'react'
import AppLayout from '../../components/AppLayout/AppLayout'
import Avatar from '../../components/Avatar/Avatar'
import AudioVisualizer3D from '../../components/AudioVisualizer3D/AudioVisualizer3D'
import ChatBubble from '../../components/ChatBubble/ChatBubble'
import InputField from '../../components/InputField/InputField'
import { CloseIcon } from '../../components/Icons'

function Chat() {
  const [voiceActive, setVoiceActive] = useState(false)

  return (
    <AppLayout showBack={true}>
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex-1 flex flex-col px-4 py-6 overflow-y-auto min-h-0">
          <div className="flex flex-col items-center mb-6">
            <Avatar type="bot" size="md" />
          </div>

          <div className="mb-4">
            <ChatBubble>
              من ربات پاسخگوی هم‌راه اول هستم برای پاسخ به سوالات شما در مورد خدمات، تعرفه‌ها، پلن‌های تشویقی، قبض و شارژ. لطفاً برای بهبود عملکرد من، بعد از دریافت پاسخ بله یا خیر را انتخاب کنید و دلیل را ذکر کنید.
            </ChatBubble>
          </div>
        </div>

        <InputField
          placeholder="..."
          onSend={(message) => console.log('Message:', message)}
          onVoiceClick={() => setVoiceActive((v) => !v)}
        />
      </div>

      {voiceActive && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 min-w-full min-h-full">
            <AudioVisualizer3D
              useMicrophone
              isMuted={false}
              className="rounded-none"
            />
          </div>
          <button
            type="button"
            onClick={() => setVoiceActive(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            aria-label="بستن"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </AppLayout>
  )
}

export default Chat
