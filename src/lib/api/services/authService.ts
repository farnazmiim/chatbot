import { get, post } from '../apiClient'
import type { ApiResponse, LoginRequest, LoginResponse, RegisterRequest } from '../types'

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  ME: '/auth/me',
} as const

export const login = async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  return post<ApiResponse<LoginResponse>>(AUTH_ENDPOINTS.LOGIN, credentials)
}

export const register = async (data: RegisterRequest): Promise<ApiResponse<LoginResponse>> => {
  return post<ApiResponse<LoginResponse>>(AUTH_ENDPOINTS.REGISTER, data)
}

export const logout = async (): Promise<ApiResponse<void>> => {
  return post<ApiResponse<void>>(AUTH_ENDPOINTS.LOGOUT)
}

export const getCurrentUser = async (): Promise<ApiResponse<LoginResponse['user']>> => {
  return get<ApiResponse<LoginResponse['user']>>(AUTH_ENDPOINTS.ME)
}

export const refreshToken = async (): Promise<ApiResponse<{ token: string }>> => {
  return post<ApiResponse<{ token: string }>>(AUTH_ENDPOINTS.REFRESH)
}
