import { useNavigate, useLocation } from 'react-router-dom'
import { MenuIcon, BackIcon } from '../Icons'

interface HeaderProps {
  showBack?: boolean
  onMenuClick?: () => void
}

function Header({ showBack = false, onMenuClick }: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick()
    } else {
      // Toggle behavior: if on settings page, go back; otherwise go to settings
      if (location.pathname === '/settings') {
        navigate(-1)
      } else {
        navigate('/settings')
      }
    }
  }

  return (
    <header className="flex items-center justify-between p-4">
      <button
        onClick={handleMenuClick}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MenuIcon />
      </button>

      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <BackIcon />
        </button>
      ) : (
        <div className="w-10" />
      )}
    </header>
  )
}

export default Header
