import { get, patch } from '../apiClient'
import type { ApiResponse, UserSettings, UpdateSettingsRequest } from '../types'

const SETTINGS_ENDPOINTS = {
  GET_SETTINGS: '/settings',
  UPDATE_SETTINGS: '/settings',
} as const

export const getSettings = async (): Promise<ApiResponse<UserSettings>> => {
  return get<ApiResponse<UserSettings>>(SETTINGS_ENDPOINTS.GET_SETTINGS)
}

export const updateSettings = async (
  data: UpdateSettingsRequest
): Promise<ApiResponse<UserSettings>> => {
  return patch<ApiResponse<UserSettings>>(SETTINGS_ENDPOINTS.UPDATE_SETTINGS, data)
}
