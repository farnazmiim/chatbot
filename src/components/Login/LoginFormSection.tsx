import { memo, useRef } from 'react'
import Logo from '../Logo/Logo'
import Button from '../Button/Button'
import { toPersianDigits } from '../../lib/persianDigits'

interface LoginFormSectionProps {
  phone: string
  phoneError: string
  onPhoneChange: (value: string) => void
  onOtpSubmit: () => void
  onGuestLogin: () => void
  onlyDigits: (value: string) => string
}

function LoginFormSectionInner({
  phone,
  phoneError,
  onPhoneChange,
  onOtpSubmit,
  onGuestLogin,
  onlyDigits,
}: LoginFormSectionProps) {
  const phoneInputRef = useRef<HTMLInputElement>(null)

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = onlyDigits(e.target.value).slice(0, 10)
    onPhoneChange(next)
    if (next.length === 10) {
      setTimeout(() => phoneInputRef.current?.blur(), 0)
    }
  }

  return (
    <div className="w-full flex-1 px-4 py-6 bg-gray-200 flex flex-col items-center rounded-tl-[40px] rounded-tr-[40px]">
      <div className="w-full max-w-sm flex flex-row items-center justify-between gap-4 mb-6">
        <button
          type="button"
          onClick={() => {}}
          className="text-base shrink-0 font-bold"
          style={{ color: '#0B0B0D' }}
        >
          ثبت نام | ورود
        </button>
        <div className="flex items-center justify-center rounded-lg overflow-hidden shrink-0 w-[100px] h-[45px]">
          <Logo className="m-0 w-[100px] h-[45px]" width={100} height={45} />
        </div>
      </div>

      <p className="text-[14px] font-normal w-full max-w-sm text-right mb-4" style={{ color: '#0B0B0D' }}>
        لطفا شماره تلفن همراه خود را وارد کنید.
      </p>

      <div className="w-full max-w-sm flex flex-row rounded-lg border-2 border-gray-300 bg-gray-50 overflow-hidden mb-6">
        <input
          ref={phoneInputRef}
          type="tel"
          inputMode="numeric"
          autoComplete="off"
          enterKeyHint="done"
          value={toPersianDigits(phone)}
          onChange={handlePhoneChange}
          placeholder="۹۱۲۳۴۵۶۷۸۹"
          className="flex-1 px-4 py-3 bg-transparent text-gray-800 text-right placeholder-gray-400 focus:outline-none"
          dir="ltr"
          maxLength={10}
        />
        <span className="flex items-center px-3 text-gray-600 text-sm border-r-2 border-gray-300">
          ۹۸+
        </span>
      </div>

      {phoneError && (
        <p className="text-sm text-red-500 w-full max-w-sm text-right mb-2">
          {phoneError}
        </p>
      )}

      <div className="w-full max-w-sm space-y-4 mt-auto pt-6">
        <Button variant="primary" onClick={onOtpSubmit}>
          ورود با رمز یکبار مصرف
        </Button>
        <Button variant="secondary" onClick={onGuestLogin}>
          ورود به عنوان مهمان
        </Button>
      </div>
    </div>
  )
}

export const LoginFormSection = memo(LoginFormSectionInner)
