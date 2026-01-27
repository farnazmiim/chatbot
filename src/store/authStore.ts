import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  username: string
  email?: string
}

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  reset: () => void
  setAuth: (data: { token: string; user: User }) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      login: async (username: string, password: string) => {
        // TODO: Replace with actual API call
        // For now, simple validation
        // بعداً می‌توانید از useLogin hook استفاده کنید
        if (username && password) {
          set({
            isAuthenticated: true,
            user: { id: '1', username },
            token: 'mock-token', // این را بعداً با token واقعی جایگزین کنید
          })
          return true
        }
        return false
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        })
      },
      reset: () => {
        localStorage.removeItem('auth-storage')
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        })
      },
      setAuth: (data: { token: string; user: User }) => {
        set({
          isAuthenticated: true,
          token: data.token,
          user: data.user,
        })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
