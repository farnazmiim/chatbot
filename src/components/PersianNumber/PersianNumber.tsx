import { type ReactNode } from 'react'
import { toPersianDigits } from '../../lib/persianDigits'

interface PersianNumberProps {
  children: string | number | ReactNode
  className?: string
}

function PersianNumber({ children, className = '' }: PersianNumberProps) {
  const value =
    typeof children === 'string' || typeof children === 'number'
      ? toPersianDigits(children)
      : children
  return <span className={className}>{value}</span>
}

export default PersianNumber
export { toPersianDigits } from '../../lib/persianDigits'
export { toEnglishDigits } from '../../lib/persianDigits'
