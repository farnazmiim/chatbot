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

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 justify-between mb-4" dir="rtl">
        <h3 className="text-gray-800 shrink-0 font-semibold text-lg">
          تاریخچه گفت‌وگوهای اخیر
        </h3>
        <div
          className="flex items-center gap-2 flex-1 min-w-0 max-w-xs border border-gray-300 px-3 py-2.5 bg-white rounded-2xl"
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
      </div>
      <div className="rounded-lg bg-white">
        <div className="mb-4">
          <h4 className="mb-2 pt-2 font-normal text-[10px] text-[#0095DA]">
            امروز
          </h4>
          {filter(today).map((item) => (
            <HistoryItem key={item.id} text={item.text} />
          ))}
        </div>
        <div className="mb-4">
          <h4 className="mb-2 pt-2 font-normal text-[10px] text-[#0095DA]">
            یک هفته پیش
          </h4>
          {filter(weekAgo).map((item) => (
            <HistoryItem key={item.id} text={item.text} />
          ))}
        </div>
        <div>
          <h4 className="mb-2 pt-2 font-normal text-[10px] text-[#0095DA]">
            یک ماه پیش
          </h4>
          {filter(monthAgo).map((item) => (
            <HistoryItem key={item.id} text={item.text} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const SettingsHistorySection = memo(SettingsHistorySectionInner)
