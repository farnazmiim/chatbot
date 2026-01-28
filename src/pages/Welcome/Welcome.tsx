import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout/AppLayout'
import Logo from '../../components/Logo/Logo'
import Button from '../../components/Button/Button'
import { useTheme } from '../../hooks/useTheme'

function Welcome() {
  const navigate = useNavigate()
  const { textClass, textSecondaryClass } = useTheme()

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 min-h-0">
        <div className="flex flex-col items-center w-full">
          <h1 className={`text-[24px] font-bold ${textClass} mb-4`} style={{ fontFamily: 'IRANSans', fontWeight: 700 }}>همیار بات</h1>

          <p className={`text-[14px] font-normal ${textSecondaryClass} text-center mb-8 leading-relaxed max-w-md`}>
            دستیاری هوشمند و کارآمد برای پاسخگویی به نیازهای مشتریان است. همیار بات با استفاده از فناوری‌های پیشرفته هوش مصنوعی، توانایی ارائه خدمات متنوع از جمله پاسخ به سوالات عمومی، راهنمایی در خصوص محصولات و خدمات، پیگیری مشکلات و پشتیبانی فنی را دارد!
          </p>

          <div className="w-full max-w-sm space-y-4">
            <Button
              variant="primary"
              onClick={() => navigate('/video-chat')}
            >
              شروع گفت‌وگو تصویری
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate('/chat')}
            >
              شروع گفت‌وگو صوتی
            </Button>
          </div>

          <Logo className="mt-12" />
        </div>
      </div>
    </AppLayout>
  )
}

export default Welcome
