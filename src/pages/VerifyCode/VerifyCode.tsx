import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { VerifyCodeHeader, OtpInputs, VerifyCodeActions } from '../../components/VerifyCode'
import { useAuthStore } from '../../store/authStore'
import { toEnglishDigits } from '../../lib/persianDigits'
import PersianNumber from '../../components/PersianNumber/PersianNumber'

const OTP_LENGTH = 5
const RESEND_SECONDS = 47

function VerifyCode() {
  const navigate = useNavigate()
  const location = useLocation()
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

  const handleDigitChange = useCallback((index: number, value: string) => {
    const normalized = toEnglishDigits(value)
    const num = normalized.replace(/\D/g, '').slice(-1)
    setDigits((prev) => {
      const next = [...prev]
      next[index] = num
      return next
    })
    if (num && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }, [])

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && !e.shiftKey && index < OTP_LENGTH - 1) {
      e.preventDefault()
      inputRefs.current[index + 1]?.focus()
      return
    }
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }, [digits])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    const raw = e.clipboardData.getData('text')
    const pasted = toEnglishDigits(raw).replace(/\D/g, '').slice(0, OTP_LENGTH)
    setDigits((prev) => {
      const next = [...prev]
      pasted.split('').forEach((c, i) => { next[i] = c })
      return next
    })
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1)
    setTimeout(() => inputRefs.current[focusIdx]?.focus(), 0)
  }, [])

  const setInputRef = useCallback((index: number, el: HTMLInputElement | null) => {
    inputRefs.current[index] = el
  }, [])

  const code = digits.join('')
  const isValid = code.length === OTP_LENGTH

  const handleConfirm = useCallback(() => {
    if (!isValid) return
    setAuth({ token: 'otp-token', user: { id: phone || 'user', username: displayPhone } })
    navigate('/chat', { replace: true })
  }, [isValid, phone, displayPhone, setAuth, navigate])

  const handleResend = useCallback(() => {
    if (secondsLeft > 0) return
    setSecondsLeft(RESEND_SECONDS)
  }, [secondsLeft])

  if (isAuthenticated) {
    navigate('/chat', { replace: true })
    return null
  }
  if (!phone) {
    navigate('/', { replace: true })
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <VerifyCodeHeader />

      <div className="flex-1 flex flex-col px-6 py-8 min-h-0">
        <h1 className="mb-2 text-right font-semibold text-lg text-gray-800">
          کد تایید را وارد کنید
        </h1>

        <p className="text-gray-600 text-right my-6 font-normal text-sm">
          کد ۵ رقمی به شماره <PersianNumber>{displayPhone}</PersianNumber> ارسال شد.
        </p>

        <OtpInputs
          digits={digits}
          onDigitChange={handleDigitChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          setInputRef={setInputRef}
        />

        <VerifyCodeActions
          isValid={isValid}
          onConfirm={handleConfirm}
          secondsLeft={secondsLeft}
          onResend={handleResend}
        />
      </div>
    </div>
  )
}

export default VerifyCode
