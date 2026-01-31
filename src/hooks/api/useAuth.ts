import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { LoginRequest } from '../../lib/api/types'
import { useAuthStore } from '../../store/authStore'

export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
}

export const useLogin = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (!credentials.username || !credentials.password) {
        throw new Error('نام کاربری و رمز عبور الزامی است')
      }

      return {
        success: true,
        data: {
          token: `mock-token-${Date.now()}`,
          user: {
            id: '1',
            username: credentials.username,
            email: `${credentials.username}@example.com`,
          },
        },
      }
    },
    onSuccess: (response) => {
      if (response.success && response.data) {
        setAuth({
          token: response.data.token,
          user: response.data.user,
        })
        queryClient.invalidateQueries({ queryKey: authKeys.currentUser() })
        onSuccessCallback?.()
      }
    },
  })
}
