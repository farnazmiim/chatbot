import { memo } from 'react'
import type { ChatColor } from '../../store/themeStore'

const CHAT_COLORS: { value: ChatColor; hex: string }[] = [
  { value: 'purple', hex: '#A955A8' },
  { value: 'black', hex: '#1E1E1E' },
  { value: 'cyan', hex: '#3DB3EA' },
]

interface ChatColorPickerProps {
  value: ChatColor
  onChange: (value: ChatColor) => void
}

function ChatColorPickerInner({ value, onChange }: ChatColorPickerProps) {
  return (
    <div className="py-4" dir="rtl">
      <div className="flex items-center justify-between gap-3" dir="rtl">
        <span className="text-sm shrink-0 text-right text-[#1e3a5f]">
          انتخاب رنگ چت
        </span>
        <div className="flex gap-3 justify-end" dir="ltr">
          {CHAT_COLORS.map(({ value: v, hex }) => (
            <button
              key={v}
              type="button"
              onClick={() => onChange(v)}
              className="w-10 h-10 rounded-lg shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0095DA]"
              style={{
                backgroundColor: hex,
                border:
                  value === v ? '2px solid #0095DA' : '2px solid transparent',
              }}
              aria-label={`رنگ ${v}`}
              aria-pressed={value === v}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export const ChatColorPicker = memo(ChatColorPickerInner)
