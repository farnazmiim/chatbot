import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout/AppLayout'
import { useAuthStore } from '../../store/authStore'
import Logo from '../../components/Logo/Logo'
import Button from '../../components/Button/Button'
import { useTheme } from '../../hooks/useTheme'

import { toEnglishDigits, toPersianDigits } from '../../lib/persianDigits'

const isValidIranMobile = (value: string): boolean => {
  const normalized = toEnglishDigits(value)
  const digits = normalized.replace(/\D/g, '')
  return digits.length === 10 && digits.startsWith('9')
}

const onlyDigits = (value: string): string => {
  const normalized = toEnglishDigits(value)
  return normalized.replace(/\D/g, '')
}

function Welcome() {
  const navigate = useNavigate()
  const { textClass, textSecondaryClass } = useTheme()
  const { isAuthenticated } = useAuthStore()
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat', { replace: true })
    }
  }, [isAuthenticated, navigate])

  if (isAuthenticated) {
    return null
  }

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col items-center min-h-0 overflow-y-auto" dir="rtl">
        <div
          className={`w-full max-w-sm rounded-2xl px-5 py-6 ${textClass.includes('white') ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h1
            className={`mb-4 text-center ${textClass}`}
            style={{ fontFamily: 'Dana', fontWeight: 600, fontSize: '18px' }}
          >
            همیار بات
          </h1>

          <p
            className={`text-[14px] ${textSecondaryClass} text-center leading-relaxed`}
          >
            دستیاری هوشمند و کارآمد برای پاسخگویی به نیازهای مشتریان است. همیار بات با استفاده از فناوری‌های پیشرفته هوش مصنوعی، توانایی ارائه خدمات متنوع از جمله پاسخ به سوالات عمومی، راهنمایی در خصوص محصولات و خدمات، پیگیری مشکلات و پشتیبانی فنی را دارد!
          </p>
        </div>

        <div className="w-full flex-1 px-4 py-6 bg-gray-200 flex flex-col items-center rounded-tl-[40px] rounded-tr-[40px]">
          <div className="w-full max-w-sm flex flex-row items-center justify-between gap-4 mb-6">
            <button
              type="button"
              onClick={() => {}}
              className={`text-base shrink-0 ${textClass}`}
              style={{ fontFamily: 'Dana', fontWeight: 700 }}
            >
              ثبت نام | ورود
            </button>
            <div className="flex items-center justify-center rounded-lg overflow-hidden shrink-0 w-[100px] h-[45px]">
              <Logo className="m-0 w-[100px] h-[45px]" width={100} height={45} />
            </div>
          </div>

          <p className={`text-sm ${textSecondaryClass} w-full max-w-sm text-right mb-2`}>
            لطفا شماره تلفن همراه خود را وارد کنید.
          </p>

          <div className="w-full max-w-sm flex flex-row rounded-lg border-2 border-gray-300 bg-gray-50 overflow-hidden mb-6">
            <input
              type="tel"
              inputMode="numeric"
              value={toPersianDigits(phone)}
              onChange={(e) => {
                const value = onlyDigits(toEnglishDigits(e.target.value)).slice(0, 10)
                setPhone(value)
                if (!value) {
                  setPhoneError('')
                } else if (!isValidIranMobile(value)) {
                  setPhoneError('شماره موبایل معتبر نیست. مثال: ۹۱۲۳۴۵۶۷۸۹')
                } else {
                  setPhoneError('')
                }
              }}
              placeholder="۹۱۲۳۴۵۶۷۸۹"
              className={`flex-1 px-4 py-3 bg-transparent ${textClass} text-right placeholder-gray-400 focus:outline-none`}
              dir="ltr"
              maxLength={10}
            />
            <span
              className={`flex items-center px-3 ${textSecondaryClass} text-sm border-r-2 border-gray-300`}
            >
              +۹۸
            </span>
          </div>

          {phoneError && (
            <p className="text-sm text-red-500 w-full max-w-sm text-right mb-2">
              {phoneError}
            </p>
          )}

          <div className="w-full max-w-sm space-y-4 mt-auto pt-6">
            <Button
              variant="primary"
              onClick={() => {
                if (!isValidIranMobile(phone)) {
                  setPhoneError('شماره موبایل معتبر نیست. مثال: ۹۱۲۳۴۵۶۷۸۹')
                  return
                }
                setPhoneError('')
                navigate('/verify-code', { state: { phone } })
              }}
            >
              ورود با رمز یکبار مصرف
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate('/chat')}
            >
              ورود به عنوان مهمان
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Welcome
