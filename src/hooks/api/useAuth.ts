import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { login, register, logout, getCurrentUser } from '../../lib/api/services/authService'
import type { LoginRequest, RegisterRequest } from '../../lib/api/types'
import { useAuthStore } from '../../store/authStore'

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
}

// Hook for login
export const useLogin = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      // TODO: وقتی API آماده شد، این کد را uncomment کنید و mock response را حذف کنید
      // const response = await login(credentials)
      // if (!response.success) {
      //   throw new Error(response.error || response.message || 'خطا در ورود به سیستم')
      // }
      // return response

      // Mock response - بدون API call
      // شبیه‌سازی delay برای واقعی‌تر شدن
      await new Promise((resolve) => setTimeout(resolve, 500))

      // بررسی ساده برای validation
      if (!credentials.username || !credentials.password) {
        throw new Error('نام کاربری و رمز عبور الزامی است')
      }

      // برگرداندن mock response
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
        // ذخیره token و user در store
        setAuth({
          token: response.data.token,
          user: response.data.user,
        })
        // Invalidate and refetch user data
        queryClient.invalidateQueries({ queryKey: authKeys.currentUser() })
        // اجرای callback در صورت وجود
        onSuccessCallback?.()
      }
    },
  })
}

// Hook for register
export const useRegister = () => {
  const queryClient = useQueryClient()
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        // ذخیره token و user در store
        setAuth({
          token: response.data.token,
          user: response.data.user,
        })
        // Invalidate and refetch user data
        queryClient.invalidateQueries({ queryKey: authKeys.currentUser() })
      }
    },
  })
}

// Hook for logout
export const useLogout = () => {
  const queryClient = useQueryClient()
  const { logout: logoutStore } = useAuthStore()

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // Clear auth store
      logoutStore()
      // Clear all queries
      queryClient.clear()
    },
  })
}

// Hook for getting current user
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: async () => {
      const response = await getCurrentUser()
      return response.data
    },
    enabled: useAuthStore.getState().isAuthenticated,
  })
}
