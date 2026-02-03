import { memo } from 'react'
import Button from '../Button/Button'
import { toPersianDigits } from '../../lib/persianDigits'

interface VerifyCodeActionsProps {
  isValid: boolean
  onConfirm: () => void
  secondsLeft: number
  onResend: () => void
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  const str = `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  return toPersianDigits(str)
}

function VerifyCodeActionsInner({
  isValid,
  onConfirm,
  secondsLeft,
  onResend,
}: VerifyCodeActionsProps) {
  return (
    <div className="mt-auto pt-6 flex flex-col gap-4">
      <Button variant="primary" onClick={onConfirm} disabled={!isValid} className="font-bold text-[16px]">
        تایید
      </Button>
      <p className="text-sm text-gray-600 text-center">
        <button
          type="button"
          onClick={onResend}
          disabled={secondsLeft > 0}
          className={secondsLeft > 0 ? 'opacity-70 cursor-not-allowed' : 'underline'}
        >
          {secondsLeft > 0
            ? `${formatTime(secondsLeft)} تا درخواست مجدد کد`
            : 'درخواست مجدد کد'}
        </button>
      </p>
    </div>
  )
}

export const VerifyCodeActions = memo(VerifyCodeActionsInner)
