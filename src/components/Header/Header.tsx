import { type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MenuIcon, BackIcon } from '../Icons'

interface HeaderProps {
  showBack?: boolean
  onMenuClick?: () => void
  centerContent?: ReactNode
}

function Header({ showBack = false, onMenuClick, centerContent }: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick()
    } else {
      if (location.pathname === '/settings') {
        navigate(-1)
      } else {
        navigate('/settings')
      }
    }
  }

  return (
    <header className="flex items-center justify-between p-4 shrink-0">
      <button
        onClick={handleMenuClick}
        className="p-2 hover:bg-gray-100 rounded-[14px] transition-colors shrink-0"
      >
        <MenuIcon />
      </button>

      {centerContent ? (
        <div className="flex-1 flex justify-center items-center min-w-0 px-1">
          {centerContent}
        </div>
      ) : null}

      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-[14px] transition-colors shrink-0"
        >
          <BackIcon />
        </button>
      ) : (
        <div className="w-10 shrink-0" />
      )}
    </header>
  )
}

export default Header
