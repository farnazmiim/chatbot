import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSettings, updateSettings } from '../../lib/api/services/settingsService'
import type { UpdateSettingsRequest } from '../../lib/api/types'

// Query keys
export const settingsKeys = {
  all: ['settings'] as const,
  current: () => [...settingsKeys.all, 'current'] as const,
}

// Hook for getting user settings
export const useSettings = () => {
  return useQuery({
    queryKey: settingsKeys.current(),
    queryFn: async () => {
      const response = await getSettings()
      return response.data
    },
  })
}

// Hook for updating user settings
export const useUpdateSettings = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateSettingsRequest) => updateSettings(data),
    onSuccess: () => {
      // Invalidate settings query to refetch
      queryClient.invalidateQueries({
        queryKey: settingsKeys.current(),
      })
    },
  })
}
