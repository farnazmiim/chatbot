import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout/AppLayout'
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
    { id: 1, text: 'لورم ایپسوم متن ساختگی' },
    { id: 2, text: 'لورم ایپسوم متن ساختگی' },
  ],
  weekAgo: [
    { id: 3, text: 'لورم ایپسوم متن ساختگی' },
    { id: 4, text: 'لورم ایپسوم متن ساختگی' },
  ],
  monthAgo: [
    { id: 5, text: 'لورم ایپسوم متن ساختگی' },
    { id: 6, text: 'لورم ایپسوم متن ساختگی' },
  ],
} as const

function Settings() {
  const navigate = useNavigate()
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
    <AppLayout showBack={true}>
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-6">
            <SettingsHistorySection
              searchValue={historySearch}
              onSearchChange={setHistorySearch}
              today={HISTORY_DATA.today}
              weekAgo={HISTORY_DATA.weekAgo}
              monthAgo={HISTORY_DATA.monthAgo}
            />

            <div className="pt-4 pb-4 border-t border-gray-200">
              <h2 className="mb-6 text-gray-800 font-semibold text-lg">
                تنظیمات
              </h2>

              <div className="mb-8 rounded-lg bg-white">
                <ChatColorPicker value={chatColor} onChange={setChatColor} />
                <SoundModePicker value={soundMode} onChange={setSoundMode} />
                <CharacterPicker value={characterId} onChange={setCharacterId} />
                <FontSizeSlider value={fontSize} onChange={setFontSize} />
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 px-4 py-4">
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
        </div>
      </div>
    </AppLayout>
  )
}

export default Settings
