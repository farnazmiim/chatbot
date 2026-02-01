import { useState, useRef, useEffect, useCallback } from 'react'
import AppLayout from '../../components/AppLayout/AppLayout'
import Avatar from '../../components/Avatar/Avatar'
import ChatBubble from '../../components/ChatBubble/ChatBubble'
import InputField from '../../components/InputField/InputField'
import VoiceVideoOverlay from '../../components/VoiceVideoOverlay/VoiceVideoOverlay'

type MessageItem = { type: 'user' | 'bot'; text: string; id: number }

const CARD_STYLE = { border: '0.35px solid #EDF0F1', boxShadow: '-1px 2px 6px 0 #D4E2ED' } as const
const LOADING_BOX_STYLE = { backgroundColor: '#F3F4F6' } as const

const INTRO_TEXT =
  'من، ربات پاسخگوی همراه اول، به سوالات شما درباره سرویس‌ها، تعرفه‌ها، طرح‌های تشویقی، صورتحساب و شارژ پاسخ می‌دهم. لطفاً پس از دریافت پاسخ، با انتخاب   یا    و ذکر دلیل، به بهبود عملکرد من کمک کنید.'

const DEFAULT_CARDS = [
  {
    id: 1,
    text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از',
  },
  {
    id: 2,
    text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از',
  },
  {
    id: 3,
    text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از',
  },
]

function Chat() {
  const [voiceActive, setVoiceActive] = useState(false)
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const nextIdRef = useRef(0)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, isLoading])

  const handleVoiceClick = useCallback(() => {
    setVoiceActive(true)
  }, [])

  const handleSend = useCallback((text: string) => {
    const userMsg: MessageItem = { type: 'user', text, id: nextIdRef.current++ }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)
    const botId = nextIdRef.current++
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: 'پاسخ نمونه. (فعلاً پاسخ ثابت نمایش داده می‌شود.)', id: botId },
      ])
      setIsLoading(false)
    }, 1500)
  }, [])

  return (
    <AppLayout showBack={true}>
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white">
        <div
          ref={scrollRef}
          className="flex-1 flex flex-col px-4 py-6 overflow-y-auto min-h-0 bg-white"
        >
          {messages.length === 0 && (
            <>
              <div className="w-full flex flex-col items-center justify-start">
                <Avatar type="bot" size="md" className="mx-auto" />
              </div>
              <p
                className="text-gray-600 text-sm text-center leading-relaxed mb-10 px-2"
                dir="rtl"
              >
                {INTRO_TEXT}
              </p>
              <div
                className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4"
                dir="rtl"
              >
                {DEFAULT_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className="flex-shrink-0 w-[170px] rounded-xl bg-white p-2.5"
                    style={CARD_STYLE}
                  >
                    <p
                      className="text-gray-700 text-xs leading-relaxed text-right line-clamp-3"
                      dir="rtl"
                    >
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {messages.map((msg) => (
            <ChatBubble key={msg.id} isUser={msg.type === 'user'}>
              {msg.text}
            </ChatBubble>
          ))}

          {isLoading && (
            <div className="flex justify-end mb-4" dir="rtl">
              <div
                className="rounded-tr-[15px] rounded-br-[15px] rounded-bl-[15px] px-4 py-3 flex items-center gap-1.5"
                style={LOADING_BOX_STYLE}
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
        <VoiceVideoOverlay onClose={() => setVoiceActive(false)} />
      )}
    </AppLayout>
  )
}

export default Chat
