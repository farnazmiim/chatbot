import { type ReactNode } from 'react'
import Header from '../Header/Header'
import { useTheme } from '../../hooks/useTheme'

interface AppLayoutProps {
  children: ReactNode
  showBack?: boolean
  onMenuClick?: () => void
  className?: string
}

function AppLayout({ children, showBack = false, onMenuClick, className = '' }: AppLayoutProps) {
  const { bgClass } = useTheme()

  return (
    <div className={`h-[100dvh] md:h-auto md:min-h-screen ${bgClass} flex flex-col overflow-hidden ${className}`}>
      <Header showBack={showBack} onMenuClick={onMenuClick} />
      {children}
    </div>
  )
}

export default AppLayout
