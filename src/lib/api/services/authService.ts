import { get, post } from '../apiClient'
import type { ApiResponse, LoginRequest, LoginResponse, RegisterRequest } from '../types'

// Auth API endpoints
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  ME: '/auth/me',
} as const

// Login
export const login = async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  return post<ApiResponse<LoginResponse>>(AUTH_ENDPOINTS.LOGIN, credentials)
}

// Register
export const register = async (data: RegisterRequest): Promise<ApiResponse<LoginResponse>> => {
  return post<ApiResponse<LoginResponse>>(AUTH_ENDPOINTS.REGISTER, data)
}

// Logout
export const logout = async (): Promise<ApiResponse<void>> => {
  return post<ApiResponse<void>>(AUTH_ENDPOINTS.LOGOUT)
}

// Get current user
export const getCurrentUser = async (): Promise<ApiResponse<LoginResponse['user']>> => {
  return get<ApiResponse<LoginResponse['user']>>(AUTH_ENDPOINTS.ME)
}

// Refresh token
export const refreshToken = async (): Promise<ApiResponse<{ token: string }>> => {
  return post<ApiResponse<{ token: string }>>(AUTH_ENDPOINTS.REFRESH)
}
