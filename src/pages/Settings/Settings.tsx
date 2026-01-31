import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout/AppLayout'
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch'
import FontSizeSlider from '../../components/FontSizeSlider/FontSizeSlider'
import HistoryItem from '../../components/HistoryItem/HistoryItem'
import Button from '../../components/Button/Button'
import { useThemeStore } from '../../store/themeStore'
import { useAuthStore } from '../../store/authStore'

function Settings() {
  const navigate = useNavigate()
  const [characterSelection, setCharacterSelection] = useState(true)
  const [videoChat, setVideoChat] = useState(true)
  const { isNightMode, setNightMode, fontSize, setFontSize, reset: resetTheme } = useThemeStore()
  const { reset: resetAuth } = useAuthStore()

  const handleLogout = () => {
    resetAuth()
    resetTheme()
    navigate('/login')
  }

  const historyData = {
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
  }

  return (
    <AppLayout showBack={true}>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6">
          <h2 className={`font-medium mb-6 ${isNightMode ? 'text-white' : 'text-gray-800'}`} style={{ fontSize: `${fontSize * 0.875}px` }}>
            تنظیمات
          </h2>

          <div className={`mb-8 rounded-lg ${isNightMode ? 'bg-gray-800' : 'bg-white'}`}>
            <ToggleSwitch
              label="انتخاب شخصیت"
              checked={characterSelection}
              onChange={setCharacterSelection}
              labelClassName="font-normal"
            />
            <ToggleSwitch
              label="گفت و گوی تصویری"
              checked={videoChat}
              onChange={setVideoChat}
              labelClassName="font-normal"
            />
            <ToggleSwitch
              label="حالت شب"
              checked={isNightMode}
              onChange={setNightMode}
              labelClassName="font-normal"
            />
            <FontSizeSlider value={fontSize} onChange={setFontSize} />
          </div>

          <div>
            <h3 className={`font-medium mb-6 ${isNightMode ? 'text-white' : 'text-gray-800'}`} style={{ fontSize: `${fontSize * 0.875}px` }}>
              تاریخچه گفت و گوهای اخیر
            </h3>

            <div className={`rounded-lg ${isNightMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="mb-4">
                <h4
                  className="text-[10px] font-normal mb-2 pt-2"
                  style={{ color: '#0095DA' }}
                >
                  امروز
                </h4>
                {historyData.today.map((item) => (
                  <HistoryItem key={item.id} text={item.text} />
                ))}
              </div>

              <div className="mb-4">
                <h4
                  className="text-[10px] font-normal mb-2 pt-2"
                  style={{ color: '#0095DA' }}
                >
                  یک هفته پیش
                </h4>
                {historyData.weekAgo.map((item) => (
                  <HistoryItem key={item.id} text={item.text} />
                ))}
              </div>

              <div>
                <h4
                  className="text-[10px] font-normal mb-2 pt-2"
                  style={{ color: '#0095DA' }}
                >
                  یک ماه پیش
                </h4>
                {historyData.monthAgo.map((item) => (
                  <HistoryItem key={item.id} text={item.text} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pb-6">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            >
              خروج از حساب کاربری
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Settings
