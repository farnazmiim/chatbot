import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import Button from '../../components/Button/Button'
import { BackIcon } from '../../components/Icons'
import { useTheme } from '../../hooks/useTheme'
import { useAuthStore } from '../../store/authStore'
import { toPersianDigits, toEnglishDigits } from '../../lib/persianDigits'
import PersianNumber from '../../components/PersianNumber/PersianNumber'

const OTP_LENGTH = 5
const RESEND_SECONDS = 47

function VerifyCode() {
  const navigate = useNavigate()
  const location = useLocation()
  const { textClass, textSecondaryClass } = useTheme()
  const { isAuthenticated, setAuth } = useAuthStore()
  const phone = (location.state as { phone?: string })?.phone ?? ''
  const displayPhone = phone ? `0${phone}` : ''

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [secondsLeft])

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('credentials' in navigator)) return
    const ac = new AbortController()
    const req = navigator.credentials.get({
      otp: { transport: ['sms'] },
      signal: ac.signal,
    } as CredentialRequestOptions) as Promise<{ code?: string } | null>
    req
      .then((cred) => {
        if (cred?.code) {
          const code = cred.code.replace(/\D/g, '').slice(0, OTP_LENGTH)
          if (code.length >= OTP_LENGTH) {
            const arr = code.split('').slice(0, OTP_LENGTH)
            setDigits(arr)
            inputRefs.current[OTP_LENGTH - 1]?.focus()
          }
        }
      })
      .catch(() => {})
    return () => ac.abort()
  }, [])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    const str = `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    return toPersianDigits(str)
  }

  const handleChange = (index: number, value: string) => {
    const normalized = toEnglishDigits(value)
    const num = normalized.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = num
    setDigits(next)
    if (num && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && !e.shiftKey && index < OTP_LENGTH - 1) {
      e.preventDefault()
      inputRefs.current[index + 1]?.focus()
      return
    }
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const raw = e.clipboardData.getData('text')
    const pasted = toEnglishDigits(raw).replace(/\D/g, '').slice(0, OTP_LENGTH)
    const next = [...digits]
    pasted.split('').forEach((c, i) => { next[i] = c })
    setDigits(next)
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1)
    inputRefs.current[focusIdx]?.focus()
  }

  const code = digits.join('')
  const isValid = code.length === OTP_LENGTH

  const handleConfirm = () => {
    if (!isValid) return
    setAuth({ token: 'otp-token', user: { id: phone || 'user', username: displayPhone } })
    navigate('/chat', { replace: true })
  }

  const handleResend = () => {
    if (secondsLeft > 0) return
    setSecondsLeft(RESEND_SECONDS)
  }

  if (isAuthenticated) {
    navigate('/chat', { replace: true })
    return null
  }
  if (!phone) {
    navigate('/', { replace: true })
    return null
  }

  return (
    <div className={`min-h-screen flex flex-col ${textClass.includes('white') ? 'bg-gray-900' : 'bg-white'}`} dir="rtl">
      <header className="flex items-center justify-between p-4 shrink-0">
        <Link
          to="/"
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-[14px] transition-colors no-underline"
          aria-label="صفحه قبلی"
        >
          <BackIcon />
          <span className={`text-sm ${textClass}`}>صفحه قبلی</span>
        </Link>
        <div className="flex items-center justify-center w-[100px] h-[45px] shrink-0">
          <Logo width={100} height={45} />
        </div>
      </header>

      <div className="flex-1 flex flex-col px-6 py-8 min-h-0">
        
        <h1
          className={`mb-2 text-right ${textClass}`}
          style={{ fontFamily: 'Dana', fontWeight: 600, fontSize: '18px' }}
        >
          کد تایید را وارد کنید
        </h1>

        <p
          className={`${textSecondaryClass} text-right my-6`}
          style={{ fontFamily: 'Dana', fontWeight: 400, fontSize: '14px' }}
        >
          کد ۵ رقمی به شماره <PersianNumber>{displayPhone}</PersianNumber> ارسال شد.
        </p>

        <div className="flex gap-2 justify-center mb-8" dir="ltr" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={toPersianDigits(d)}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-12 h-12 text-center text-lg rounded-lg border-2 bg-transparent ${textClass} focus:outline-none focus:ring-2 focus:ring-[#0095DA] focus:border-transparent ${
                textClass.includes('white') ? 'border-gray-600' : 'border-gray-300'
              }`}
              style={{ fontFamily: 'Dana' }}
              dir="ltr"
            />
          ))}
        </div>

        <div className="mt-auto pt-6 flex flex-col gap-4">
        
          <Button variant="primary" onClick={handleConfirm} disabled={!isValid}>
            تایید
          </Button>

          <p className={`text-sm ${textSecondaryClass} text-center`}>
            <button
              type="button"
              onClick={handleResend}
              disabled={secondsLeft > 0}
              className={secondsLeft > 0 ? 'opacity-70 cursor-not-allowed' : 'underline'}
            >
              {secondsLeft > 0
                ? `${formatTime(secondsLeft)} تا درخواست مجدد کد`
                : 'درخواست مجدد کد'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyCode
