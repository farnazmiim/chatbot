import { useState, useRef, useEffect } from 'react'
import AppLayout from '../../components/AppLayout/AppLayout'
import Avatar from '../../components/Avatar/Avatar'
import AudioVisualizer3D from '../../components/AudioVisualizer3D/AudioVisualizer3D'
import ChatBubble from '../../components/ChatBubble/ChatBubble'
import InputField from '../../components/InputField/InputField'
import { CloseIcon } from '../../components/Icons'

type MessageItem = { type: 'user' | 'bot'; text: string }

const INTRO_TEXT =
  'ربات پاسخگوی هم‌راه اول برای پاسخ به سوالات شما در مورد خدمات، تعرفه‌ها، پلن‌های تشویقی، قبض و شارژ. لطفاً برای بهبود عملکرد، بعد از دریافت پاسخ بله یا خیر را انتخاب کنید و دلیل را ذکر کنید.'

const DEFAULT_CARDS = [
  { id: 1, text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از' },
  { id: 2, text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از' },
  { id: 3, text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از' },
]

function Chat() {
  const [voiceActive, setVoiceActive] = useState(false)
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isLoading])

  const handleVoiceClick = () => {
    setVoiceActive((prev) => !prev)
  }

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { type: 'user', text }])
    setIsLoading(true)
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: 'bot', text: 'پاسخ نمونه. (فعلاً پاسخ ثابت نمایش داده می‌شود.)' }])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <AppLayout showBack={true}>
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white">
        <div
          ref={scrollRef}
          className="flex-1 flex flex-col px-4 py-6 overflow-y-auto min-h-0 bg-white"
        >
          <div className="w-full flex flex-col items-center justify-start">
            <Avatar type="bot" size="md" className="mx-auto" />
          </div>

          {messages.length === 0 && (
            <>
              <p className="text-gray-600 text-sm text-center leading-relaxed mb-6 px-2" dir="rtl">
                {INTRO_TEXT}
              </p>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4" dir="rtl">
                {DEFAULT_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className="flex-shrink-0 w-[280px] rounded-xl bg-gray-100 border border-gray-200 p-4"
                  >
                    <p className="text-gray-700 text-xs leading-relaxed text-right" dir="rtl">
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {messages.map((msg, i) => (
            <ChatBubble key={i} isUser={msg.type === 'user'}>
              {msg.text}
            </ChatBubble>
          ))}

          {isLoading && (
            <div className="flex justify-end mb-4" dir="rtl">
              <div
                className="rounded-tr-[15px] rounded-br-[15px] rounded-bl-[15px] px-4 py-3 flex items-center gap-1.5"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>

        <InputField
          placeholder="سلام چطوری؟"
          onSend={handleSend}
          onVoiceClick={handleVoiceClick}
        />
      </div>

      {voiceActive && (
        <div className="fixed inset-0 z-50 backdrop-blur-md">
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-[350px] h-[350px] relative rounded-full overflow-hidden"
              style={{
                boxShadow: 'rgba(0, 182, 199, 0.6) 0px 0px 60px, rgba(0, 182, 199, 0.4) 0px 0px 100px, rgba(0, 212, 170, 0.3) 0px 0px 140px, rgba(0, 182, 199, 0.5) 0px 0px 80px inset, rgba(0, 212, 170, 0.35) 0px 0px 120px inset',
                border: '2px solid rgba(0, 182, 199, 0.5)',
                background: 'transparent',
              }}
            >
              <AudioVisualizer3D
                useMicrophone
                isMuted={false}
                compact={false}
                hideBackground={true}
                className="relative w-full h-full rounded-none"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleVoiceClick}
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
