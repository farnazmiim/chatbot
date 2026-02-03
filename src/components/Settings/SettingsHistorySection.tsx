import { memo } from 'react'
import { SearchIcon } from '../Icons'
import HistoryItem from '../HistoryItem/HistoryItem'

export type HistoryGroup = readonly { id: number; text: string }[]

interface SettingsHistorySectionProps {
  searchValue: string
  onSearchChange: (value: string) => void
  today: HistoryGroup
  weekAgo: HistoryGroup
  monthAgo: HistoryGroup
}

function SettingsHistorySectionInner({
  searchValue,
  onSearchChange,
  today,
  weekAgo,
  monthAgo,
}: SettingsHistorySectionProps) {
  const filter = (items: HistoryGroup) =>
    items.filter(
      (item) => !searchValue.trim() || item.text.includes(searchValue.trim())
    )

  const filteredToday = filter(today)
  const filteredWeekAgo = filter(weekAgo)
  const filteredMonthAgo = filter(monthAgo)
  const hasAnyResults =
    filteredToday.length > 0 ||
    filteredWeekAgo.length > 0 ||
    filteredMonthAgo.length > 0

  return (
    <div className="mb-8 w-full" dir="rtl">
      <div className="flex items-center gap-3 justify-between mb-4 w-full">
        <div
          className="flex items-center gap-2 flex-1 min-w-0 max-w-xs border border-gray-300 px-3 py-2.5 bg-white rounded-2xl order-2"
          dir="rtl"
        >
          <SearchIcon className="w-4 h-4 shrink-0 text-gray-400" />
          <input
            type="search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="اینجا جستجو کنید..."
            className="flex-1 min-w-0 bg-transparent border-0 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 text-right font-normal text-[10px]"
            aria-label="جستجو در تاریخچه"
          />
        </div>
        <div className="shrink-0 order-1 text-right">
          <h2 className="text-gray-800 font-semibold text-lg whitespace-nowrap">
            تاریخچه گفت‌وگوهای اخیر
          </h2>
        </div>
      </div>
      <div className="rounded-lg bg-white w-full py-2">
        {filteredToday.length > 0 && (
          <section className="mb-4" aria-labelledby="history-today">
            <h3 id="history-today" className="mb-2 pt-2 font-medium text-xs text-[#0095DA] text-right">
              امروز
            </h3>
            {filteredToday.map((item) => (
              <HistoryItem key={item.id} text={item.text} />
            ))}
          </section>
        )}
        {filteredWeekAgo.length > 0 && (
          <section className="mb-4" aria-labelledby="history-week">
            <h3 id="history-week" className="mb-2 pt-2 font-medium text-xs text-[#0095DA] text-right">
              یک هفته پیش
            </h3>
            {filteredWeekAgo.map((item) => (
              <HistoryItem key={item.id} text={item.text} />
            ))}
          </section>
        )}
        {filteredMonthAgo.length > 0 && (
          <section aria-labelledby="history-month">
            <h3 id="history-month" className="mb-2 pt-2 font-medium text-xs text-[#0095DA] text-right">
              یک ماه پیش
            </h3>
            {filteredMonthAgo.map((item) => (
              <HistoryItem key={item.id} text={item.text} />
            ))}
          </section>
        )}
        {searchValue.trim() && !hasAnyResults && (
          <p className="py-4 text-center text-gray-500 text-sm" dir="rtl">
            نتیجه‌ای یافت نشد
          </p>
        )}
      </div>
    </div>
  )
}

export const SettingsHistorySection = memo(SettingsHistorySectionInner)
