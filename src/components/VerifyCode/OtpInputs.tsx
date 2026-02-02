import { memo } from 'react'
import { toPersianDigits } from '../../lib/persianDigits'

interface OtpInputsProps {
  digits: string[]
  onDigitChange: (index: number, value: string) => void
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void
  onPaste: (e: React.ClipboardEvent) => void
  setInputRef: (index: number, el: HTMLInputElement | null) => void
}

function OtpInputsInner({
  digits,
  onDigitChange,
  onKeyDown,
  onPaste,
  setInputRef,
}: OtpInputsProps) {
  return (
    <div className="flex gap-2 justify-center mb-8" dir="ltr" onPaste={onPaste}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => setInputRef(i, el)}
          type="tel"
          inputMode="numeric"
          maxLength={1}
          value={toPersianDigits(d)}
          onChange={(e) => onDigitChange(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          className="w-12 h-12 text-center text-lg rounded-lg border-2 bg-transparent text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0095DA] focus:border-transparent"
          dir="ltr"
        />
      ))}
    </div>
  )
}

export const OtpInputs = memo(OtpInputsInner)
