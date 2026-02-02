import { memo, useCallback, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { SpeakerIcon, CopyIcon, DislikeIcon, LikeIcon } from '../Icons'
import { useThemeStore } from '../../store/themeStore'

interface ChatBubbleProps {
  children: ReactNode
  isUser?: boolean
  className?: string
  copyText?: string
  onCopied?: () => void
}

const USER_BUBBLE_COLORS = {
  purple: '#6B21A8',
  black: '#000000',
  cyan: '#0095DA',
} as const

function ChatBubble({ children, isUser = false, className = '', copyText, onCopied }: ChatBubbleProps) {
  const voicesRef = useRef<SpeechSynthesisVoice[]>([])
  const chatColor = useThemeStore((s) => s.chatColor)
  const userBubbleBg = USER_BUBBLE_COLORS[chatColor]

  useEffect(() => {
    const load = () => {
      voicesRef.current = window.speechSynthesis.getVoices()
    }
    load()
    window.speechSynthesis.onvoiceschanged = load
    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  const getText = useCallback(
    () => {
      const raw =
        copyText ??
        (typeof children === 'string'
          ? children
          : typeof children === 'number'
            ? String(children)
            : '')
      return raw === 'null' || raw == null ? '' : raw
    },
    [children, copyText]
  )

  const displayText =
    children != null && (typeof children === 'string' || typeof children === 'number')
      ? String(children) === 'null'
        ? ''
        : String(children)
      : ''

  const handleCopy = useCallback(() => {
    const text = getText()
    if (text && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => onCopied?.()).catch(() => {})
    }
  }, [getText, onCopied])

  const getSpeechLang = useCallback((text: string): string => {
    let arabicPersian = 0
    let latin = 0
    for (const c of text) {
      const code = c.codePointAt(0) ?? 0
      if (code >= 0x0600 && code <= 0x06ff) arabicPersian++
      else if ((code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a)) latin++
    }
    if (latin > arabicPersian) return 'en-US'
    if (arabicPersian > 0) return 'fa-IR'
    return 'fa-IR'
  }, [])

  const handleSpeak = useCallback(() => {
    const raw = getText()
    const text = typeof raw === 'string' ? raw.trim() : ''
    if (!text || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const lang = getSpeechLang(text)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.95
    utterance.pitch = 1

    const voices = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices()
    const langPrefix = lang.split('-')[0]
    const voice =
      voices.find((v) => v.lang === lang) ||
      voices.find((v) => v.lang.startsWith(langPrefix))
    if (voice) utterance.voice = voice

    window.speechSynthesis.speak(utterance)
  }, [getText, getSpeechLang])

  if (isUser) {
    return (
      <div className={`flex justify-start mb-4 ${className}`} dir="rtl">
        <div
          className="rounded-tl-[20px] rounded-br-[20px] rounded-bl-[20px] px-4 py-3 max-w-[80%]"
          style={{ backgroundColor: userBubbleBg }}
        >
          <p className="text-white text-sm leading-relaxed">{displayText}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex justify-end mb-4 ${className}`} dir="rtl">
      <div
        className="rounded-tr-[15px] rounded-br-[15px] rounded-bl-[15px] px-4 py-3 max-w-[80%]"
        style={{ backgroundColor: '#F3F4F6' }}
      >
        <p className="text-gray-800 text-sm leading-relaxed">{displayText}</p>
        <div className="flex items-center justify-end gap-3 mt-2 pt-2 border-t border-gray-200" dir="rtl" style={{ color: '#071465' }}>
          <span
            role="button"
            tabIndex={0}
            onClick={handleSpeak}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleSpeak()
              }
            }}
            className="p-1 hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="پخش صدا"
            title="پخش صدا"
          >
            <SpeakerIcon className="w-[11px] h-[11px]" />
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 hover:opacity-80 transition-opacity relative"
            aria-label="کپی"
          >
            <CopyIcon className="w-[11px] h-[11px]" />
          </button>
          <button type="button" className="p-1 hover:opacity-80 transition-opacity" aria-label="منفی">
            <DislikeIcon className="w-[11px] h-[11px]" />
          </button>
          <button type="button" className="p-1 hover:opacity-80 transition-opacity" aria-label="مثبت">
            <LikeIcon className="w-[11px] h-[11px]" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(ChatBubble)
