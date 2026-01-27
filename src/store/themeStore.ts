import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  isNightMode: boolean
  fontSize: number
  toggleNightMode: () => void
  setNightMode: (value: boolean) => void
  setFontSize: (value: number) => void
  reset: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isNightMode: false,
      fontSize: 16,
      toggleNightMode: () => set((state) => ({ isNightMode: !state.isNightMode })),
      setNightMode: (value: boolean) => set({ isNightMode: value }),
      setFontSize: (value: number) => set({ fontSize: value }),
      reset: () => {
        localStorage.removeItem('theme-storage')
        set({ isNightMode: false, fontSize: 16 })
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)
