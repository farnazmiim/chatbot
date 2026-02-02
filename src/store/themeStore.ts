import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ChatColor = 'purple' | 'black' | 'cyan'
export type SoundMode = 'off' | 'waves' | 'glow'
export type CharacterId = 0 | 1 | 2

interface ThemeState {
  fontSize: number
  chatColor: ChatColor
  soundMode: SoundMode
  characterId: CharacterId
  setFontSize: (value: number) => void
  setChatColor: (value: ChatColor) => void
  setSoundMode: (value: SoundMode) => void
  setCharacterId: (value: CharacterId) => void
  reset: () => void
}

const defaultState = {
  fontSize: 16,
  chatColor: 'cyan' as ChatColor,
  soundMode: 'glow' as SoundMode,
  characterId: 2 as CharacterId,
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      ...defaultState,
      setFontSize: (value: number) => set({ fontSize: value }),
      setChatColor: (value: ChatColor) => set({ chatColor: value }),
      setSoundMode: (value: SoundMode) => set({ soundMode: value }),
      setCharacterId: (value: CharacterId) => set({ characterId: value }),
      reset: () => {
        localStorage.removeItem('theme-storage')
        set(defaultState)
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)
