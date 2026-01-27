import { get, patch } from '../apiClient'
import type { ApiResponse, UserSettings, UpdateSettingsRequest } from '../types'

// Settings API endpoints
const SETTINGS_ENDPOINTS = {
  GET_SETTINGS: '/settings',
  UPDATE_SETTINGS: '/settings',
} as const

// Get user settings
export const getSettings = async (): Promise<ApiResponse<UserSettings>> => {
  return get<ApiResponse<UserSettings>>(SETTINGS_ENDPOINTS.GET_SETTINGS)
}

// Update user settings
export const updateSettings = async (
  data: UpdateSettingsRequest
): Promise<ApiResponse<UserSettings>> => {
  return patch<ApiResponse<UserSettings>>(SETTINGS_ENDPOINTS.UPDATE_SETTINGS, data)
}
