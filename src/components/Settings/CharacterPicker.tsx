import { memo } from 'react'
import type { CharacterId } from '../../store/themeStore'

const CHARACTER_COLORS: Record<CharacterId, string> = {
  0: '#FCD34D',
  1: '#93C5FD',
  2: '#C4B5FD',
}

interface CharacterPickerProps {
  value: CharacterId
  onChange: (value: CharacterId) => void
}

function CharacterPickerInner({ value, onChange }: CharacterPickerProps) {
  const ids: CharacterId[] = [0, 1, 2]

  return (
    <div className="py-4" dir="rtl">
      <div className="flex items-center justify-between gap-3" dir="rtl">
        <span className="text-sm shrink-0 text-right text-[#1e3a5f]">
          انتخاب شخصیت
        </span>
        <div className="flex gap-3 justify-end" dir="ltr">
          {ids.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className="w-10 h-10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#0095DA] bg-gray-200"
              style={{
                border:
                  value === id ? '2px solid #0095DA' : '2px solid transparent',
              }}
              aria-label={`شخصیت ${id + 1}`}
              aria-pressed={value === id}
            >
              <span
                className="w-full h-full flex items-center justify-center text-lg"
                style={{
                  backgroundColor: CHARACTER_COLORS[id],
                  color: '#1e3a5f',
                }}
              >
                {id + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export const CharacterPicker = memo(CharacterPickerInner)
