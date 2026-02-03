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

  const isSettings = location.pathname === '/settings'

  return (
    <header className="flex items-center justify-between p-4 shrink-0">
      <button
        type="button"
        onClick={isSettings ? () => navigate(-1) : handleMenuClick}
        className="w-11 h-10 min-w-11 py-2 hover:bg-gray-100 rounded-[14px] transition-colors shrink-0 flex items-center justify-center"
        style={{ color: '#000000' }}
        aria-label={isSettings ? 'بازگشت' : 'منو'}
        title={isSettings ? 'بازگشت' : 'منو'}
      >
        {isSettings ? <BackIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {centerContent ? (
        <div className="flex-1 flex justify-center items-center min-w-0 px-1">
          {centerContent}
        </div>
      ) : null}

      {showBack ? (
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="py-2 pe-0 ps-1 hover:bg-gray-100 rounded-[14px] transition-colors shrink-0 flex items-center justify-center"
          style={{ color: '#000000' }}
          aria-label="بازگشت"
          title="بازگشت"
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
