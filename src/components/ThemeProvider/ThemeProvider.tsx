import { useEffect } from 'react'
import { useThemeStore } from '../../store/themeStore'

interface ThemeProviderProps {
  children: React.ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const { isNightMode, fontSize } = useThemeStore()

  useEffect(() => {
    if (isNightMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isNightMode])

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
  }, [fontSize])

  return <>{children}</>
}

export default ThemeProvider
