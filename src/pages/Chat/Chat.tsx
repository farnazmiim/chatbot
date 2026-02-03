import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import AppLayout from '../../components/AppLayout/AppLayout'
import Avatar from '../../components/Avatar/Avatar'
import ChatBubble from '../../components/ChatBubble/ChatBubble'
import {
  LocationTargetIcon,
  EditPencilIcon,
  SendPaperIcon,
} from '../../components/Icons'
import InputField from '../../components/InputField/InputField'
import VoiceVideoOverlay from '../../components/VoiceVideoOverlay/VoiceVideoOverlay'
import ChatModeBar, { type ChatMode } from '../../components/ChatModeBar/ChatModeBar'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

type MessageItem = { type: 'user' | 'bot'; text: string; id: number }

const CARD_STYLE = {
  border: '0.35px solid #EDF0F1',
  boxShadow: '-1px 2px 6px 0 #D4E2ED',
} as const
const LOADING_BOX_STYLE = { backgroundColor: '#F3F4F6' } as const

const INTRO_TEXT =
  'من، ربات پاسخگوی همراه اول، به سوالات شما درباره سرویس‌ها، تعرفه‌ها، طرح‌های تشویقی، صورتحساب و شارژ پاسخ می‌دهم. لطفاً پس از دریافت پاسخ، با انتخاب   یا    و ذکر دلیل، به بهبود عملکرد من کمک کنید.'

const CARD_ICONS = [
  LocationTargetIcon,
  EditPencilIcon,
  SendPaperIcon,
] as const

const DEFAULT_CARDS = [
  { id: 1, text: 'چطور بسته اینترنت بخرم؟' },
  { id: 2, text: 'موجودی حساب و شارژ سیم‌کارت' },
  { id: 3, text: 'تعرفه تماس و پیامک' },
]

function Chat() {
  const location = useLocation()
  useDocumentTitle('چت')
  const [mode, setMode] = useState<ChatMode>(
    (location.state as { openVoice?: boolean } | null)?.openVoice ? 'voice' : 'chat'
  )
  const [voiceActive, setVoiceActive] = useState(
    Boolean((location.state as { openVoice?: boolean } | null)?.openVoice)
  )
  const [overlayInitialMode, setOverlayInitialMode] = useState<ChatMode>('voice')
  const [showCopyToast, setShowCopyToast] = useState(false)
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomAnchorRef = useRef<HTMLDivElement>(null)
  const nextIdRef = useRef(0)

  const handleCopied = useCallback(() => {
    setShowCopyToast(true)
    setTimeout(() => setShowCopyToast(false), 2000)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = prefersReducedMotion ? 'auto' : 'smooth'
    const scrollToBottom = () => {
      bottomAnchorRef.current?.scrollIntoView({ behavior, block: 'end' })
    }
    scrollToBottom()
    const t = setTimeout(scrollToBottom, 50)
    const t2 = setTimeout(scrollToBottom, 300)
    return () => {
      clearTimeout(t)
      clearTimeout(t2)
    }
  }, [messages, isLoading])

  const handleVoiceClick = useCallback(() => {
    setOverlayInitialMode('voice')
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
        {
          type: 'bot',
          text: 'پاسخ نمونه. (فعلاً پاسخ ثابت نمایش داده می‌شود.)',
          id: botId,
        },
      ])
      setIsLoading(false)
    }, 1500)
  }, [])

  return (
    <AppLayout
      headerCenter={
        <ChatModeBar
          compact
          mode={mode}
          onModeChange={(m) => {
            setMode(m)
            if (m === 'video') {
              setOverlayInitialMode('video')
              setVoiceActive(true)
            }
            if (m === 'voice') {
              setOverlayInitialMode('voice')
              setVoiceActive(true)
            }
            if (m === 'chat') setVoiceActive(false)
          }}
        />
      }
    >
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white">
        <div
          ref={scrollRef}
          className="flex-1 flex flex-col px-4 py-6 overflow-y-auto min-h-0 bg-white"
          role="region"
          aria-label="لیست پیام‌ها"
        >
          <h1 className="sr-only">چت</h1>
          {messages.length === 0 && (
            <>
              <div className="w-full flex flex-col items-center justify-start mb-6">
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
                {DEFAULT_CARDS.map((card, index) => {
                  const Icon = CARD_ICONS[index]
                  return (
                    <div
                      key={card.id}
                      className="flex-shrink-0 w-[145px] rounded-xl bg-white p-2.5 flex flex-col items-start gap-2"
                      dir="rtl"
                      style={CARD_STYLE}
                    >
                      <Icon className="w-4 h-[15px] shrink-0" />
                      <p
                        className="text-gray-700 text-xs leading-relaxed text-right line-clamp-3 w-full"
                        dir="rtl"
                      >
                        {card.text}
                      </p>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              isUser={msg.type === 'user'}
              copyText={msg.text ?? ''}
              onCopied={handleCopied}
            >
              {msg.text ?? ''}
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
          <div ref={bottomAnchorRef} className="min-h-1 shrink-0" aria-hidden />
        </div>

        <InputField
          placeholder="اینجا بنویسید.."
          onSend={handleSend}
          onVoiceClick={handleVoiceClick}
        />
      </div>

      {showCopyToast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-5 py-3 rounded-[14px] text-white text-sm font-Dana shadow-lg"
          style={{ backgroundColor: '#6B7280' }}
        >
          کپی شد
        </div>
      )}

      {voiceActive && (
        <VoiceVideoOverlay
          initialMode={overlayInitialMode === 'chat' ? 'voice' : overlayInitialMode}
          onClose={() => {
            setVoiceActive(false)
            setMode('chat')
          }}
        />
      )}
    </AppLayout>
  )
}

export default Chat
