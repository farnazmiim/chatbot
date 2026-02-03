import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout/AppLayout'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import FontSizeSlider from '../../components/FontSizeSlider/FontSizeSlider'
import Button from '../../components/Button/Button'
import { LogoutIcon } from '../../components/Icons'
import {
  SettingsHistorySection,
  ChatColorPicker,
  SoundModePicker,
  CharacterPicker,
} from '../../components/Settings'
import { useThemeStore } from '../../store/themeStore'
import { useAuthStore } from '../../store/authStore'

const HISTORY_DATA = {
  today: [
    { id: 1, text: 'چطور می‌تونم بسته اینترنت بخرم؟' },
    { id: 2, text: 'موجودی حسابم چقدره؟' },
  ],
  weekAgo: [
    { id: 3, text: 'سیم‌کارت گم شده رو چطور مسدود کنم؟' },
    { id: 4, text: 'تعرفه تماس با خارج چنده؟' },
  ],
  monthAgo: [
    { id: 5, text: 'چطور رمز دوم رو عوض کنم؟' },
    { id: 6, text: 'آخرین قسط قبضم کی سررسیده؟' },
  ],
} as const

function Settings() {
  const navigate = useNavigate()
  useDocumentTitle('تنظیمات')
  const {
    fontSize,
    setFontSize,
    chatColor,
    setChatColor,
    soundMode,
    setSoundMode,
    characterId,
    setCharacterId,
    reset: resetTheme,
  } = useThemeStore()
  const { reset: resetAuth } = useAuthStore()

  const [historySearch, setHistorySearch] = useState('')

  const handleLogout = () => {
    resetAuth()
    resetTheme()
    navigate('/')
  }

  return (
    <AppLayout>
      <div className="px-4 py-6">
        <SettingsHistorySection
          searchValue={historySearch}
          onSearchChange={setHistorySearch}
          today={HISTORY_DATA.today}
          weekAgo={HISTORY_DATA.weekAgo}
          monthAgo={HISTORY_DATA.monthAgo}
        />

        <div className="pt-6 pb-4 border-t border-gray-200 mt-6">
          <h1 className="mb-6 text-gray-800 font-semibold text-lg">
            تنظیمات
          </h1>

          <div className="mb-4 rounded-lg bg-white">
            <ChatColorPicker value={chatColor} onChange={setChatColor} />
            <SoundModePicker value={soundMode} onChange={setSoundMode} />
            <CharacterPicker value={characterId} onChange={setCharacterId} />
            <FontSizeSlider value={fontSize} onChange={setFontSize} />
          </div>
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col items-center gap-2">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center gap-2"
        >
          <span className="flex items-center gap-2" dir="rtl">
            <LogoutIcon className="shrink-0 w-5 h-5" />
            خروج از حساب کاربری
          </span>
        </Button>
        <p
          className="text-[10px] font-light"
          style={{ color: '#16013C' }}
        >
          نسخه 1.00
        </p>
      </div>
    </AppLayout>
  )
}

export default Settings
