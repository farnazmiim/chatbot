import { useThemeStore } from '../store/themeStore'

export function useTheme() {
  const { isNightMode, fontSize } = useThemeStore()

  return {
    isNightMode,
    fontSize,
    bgClass: isNightMode ? 'bg-gray-900' : 'bg-white',
    textClass: isNightMode ? 'text-white' : 'text-gray-800',
    textSecondaryClass: isNightMode ? 'text-gray-300' : 'text-gray-600',
    borderClass: isNightMode ? 'border-gray-700' : 'border-gray-200',
  }
}
