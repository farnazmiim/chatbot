import { type ReactNode } from 'react'
import Header from '../Header/Header'

interface AppLayoutProps {
  children: ReactNode
  showBack?: boolean
  onMenuClick?: () => void
  headerCenter?: ReactNode
  className?: string
}

function AppLayout({ children, showBack = false, onMenuClick, headerCenter, className = '' }: AppLayoutProps) {
  return (
    <div className={`h-[100dvh] md:h-auto md:min-h-screen bg-white flex flex-col overflow-hidden ${className}`}>
      <Header showBack={showBack} onMenuClick={onMenuClick} centerContent={headerCenter} />
      <main id="main-content" className="flex-1 overflow-y-auto flex flex-col min-h-0" tabIndex={-1}>
        {children}
      </main>
    </div>
  )
}

export default AppLayout
