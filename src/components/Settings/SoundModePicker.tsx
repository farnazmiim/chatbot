import { memo } from 'react'
import { SoundModeWavesIcon } from '../Icons'
import type { SoundMode } from '../../store/themeStore'

interface SoundModePickerProps {
  value: SoundMode
  onChange: (value: SoundMode) => void
}

function SoundModePickerInner({ value, onChange }: SoundModePickerProps) {
  const modes: SoundMode[] = ['off', 'waves', 'glow']

  return (
    <div className="py-4" dir="rtl">
      <div className="flex items-center justify-between gap-3" dir="rtl">
        <span className="text-sm shrink-0 text-right text-[#1e3a5f]">
          انتخاب حالت صدا
        </span>
        <div className="flex gap-3 justify-end" dir="ltr">
          {modes.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onChange(mode)}
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-[#0095DA] bg-gray-200"
              style={{
                border:
                  value === mode
                    ? '2px solid #0095DA'
                    : '2px solid transparent',
              }}
              aria-label={`حالت صدا ${mode}`}
              aria-pressed={value === mode}
            >
              {mode === 'off' && (
                <span className="w-3 h-3 rounded-full bg-black" />
              )}
              {mode === 'waves' && (
                <SoundModeWavesIcon className="w-5 h-5" />
              )}
              {mode === 'glow' && (
                <span
                  className="w-5 h-5 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(0,149,218,0.85))',
                    boxShadow: '0 0 10px rgba(0,149,218,0.4)',
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export const SoundModePicker = memo(SoundModePickerInner)
