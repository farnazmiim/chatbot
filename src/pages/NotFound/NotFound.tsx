import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout/AppLayout'
import Button from '../../components/Button/Button'
import PersianNumber from '../../components/PersianNumber/PersianNumber'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

function NotFound() {
  const navigate = useNavigate()
  useDocumentTitle('صفحه پیدا نشد')
  const accentColor = '#1e3a5f'

  return (
    <AppLayout showBack={false}>
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 min-h-0 text-gray-800"
        dir="rtl"
      >
        <p
          className="text-6xl font-Dana mb-2"
          style={{ color: accentColor, fontWeight: 600 }}
        >
          <PersianNumber>404</PersianNumber>
        </p>
        <p className="text-center mb-8 font-Dana text-[18px] font-medium text-gray-600">
          صفحه مورد نظر پیدا نشد
        </p>
        <div className="w-full max-w-xs">
          <Button onClick={() => navigate('/')}>برگشت به صفحه اصلی</Button>
        </div>
      </div>
    </AppLayout>
  )
}

export default NotFound
