import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout/AppLayout'
import { LoginIntroCard, LoginFormSection } from '../../components/Login'
import { useAuthStore } from '../../store/authStore'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { toEnglishDigits } from '../../lib/persianDigits'

const isValidIranMobile = (value: string): boolean => {
  const normalized = toEnglishDigits(value)
  const digits = normalized.replace(/\D/g, '')
  return digits.length === 10 && digits.startsWith('9')
}

const onlyDigits = (value: string): string => {
  const normalized = toEnglishDigits(value)
  return normalized.replace(/\D/g, '')
}

const OTP_ERROR = 'شماره موبایل معتبر نیست. مثال: ۹۱۲۳۴۵۶۷۸۹'

function Login() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  useDocumentTitle('ورود')

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handlePhoneChange = useCallback((value: string) => {
    setPhone(value)
    if (!value) {
      setPhoneError('')
    } else if (!isValidIranMobile(value)) {
      setPhoneError(OTP_ERROR)
    } else {
      setPhoneError('')
    }
  }, [])

  const handleOtpSubmit = useCallback(() => {
    if (!isValidIranMobile(phone)) {
      setPhoneError(OTP_ERROR)
      return
    }
    setPhoneError('')
    navigate('/verify-code', { state: { phone } })
  }, [phone, navigate])

  const handleGuestLogin = useCallback(() => {
    navigate('/chat')
  }, [navigate])

  if (isAuthenticated) {
    return null
  }

  return (
    <AppLayout>
      <div
        className="flex-1 flex flex-col items-center min-h-0 overflow-y-auto"
        dir="rtl"
      >
        <LoginIntroCard />
        <LoginFormSection
          phone={phone}
          phoneError={phoneError}
          onPhoneChange={handlePhoneChange}
          onOtpSubmit={handleOtpSubmit}
          onGuestLogin={handleGuestLogin}
          onlyDigits={onlyDigits}
        />
      </div>
    </AppLayout>
  )
}

export default Login
