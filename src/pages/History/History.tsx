import AppLayout from '../../components/AppLayout/AppLayout'
import HistoryItem from '../../components/HistoryItem/HistoryItem'
import { useTheme } from '../../hooks/useTheme'

function History() {
  const { textClass, textSecondaryClass } = useTheme()

  return (
    <AppLayout showBack={true}>
      <div className="flex-1 px-4 py-6">
        <h2
        className={`${textClass} mb-6`}
        style={{ fontFamily: 'Dana', fontWeight: 600, fontSize: '18px' }}
      >
        تاریخچه گفت و گوهای اخیر
      </h2>

        <div className="mb-4">
          <h4 className={`text-sm ${textSecondaryClass} mb-2`}>امروز</h4>
          <HistoryItem text="لورم ایپسوم متن ساختگی" date="امروز" />
          <HistoryItem text="لورم ایپسوم متن ساختگی" date="امروز" />
        </div>

        <div className="mb-4">
          <h4 className={`text-sm ${textSecondaryClass} mb-2`}>یک هفته پیش</h4>
          <HistoryItem text="لورم ایپسوم متن ساختگی" date="یک هفته پیش" />
          <HistoryItem text="لورم ایپسوم متن ساختگی" date="یک هفته پیش" />
        </div>

        <div>
          <h4 className={`text-sm ${textSecondaryClass} mb-2`}>یک ماه پیش</h4>
          <HistoryItem text="لورم ایپسوم متن ساختگی" date="یک ماه پیش" />
          <HistoryItem text="لورم ایپسوم متن ساختگی" date="یک ماه پیش" />
        </div>
      </div>
    </AppLayout>
  )
}

export default History
