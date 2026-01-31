import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const authStorage = localStorage.getItem('auth-storage')
    if (authStorage) {
      try {
        const authData = JSON.parse(authStorage)
        const token = authData?.state?.token || authData?.state?.user?.token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch (error) {
        console.error('Error parsing auth storage:', error)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized - Please login again')
          break
        case 403:
          console.error('Forbidden - Access denied')
          break
        case 404:
          console.error('Not Found - Resource not found')
          break
        case 500:
          console.error('Server Error - Please try again later')
          break
        default:
          console.error('API Error:', error.response.data?.message || error.message)
      }
    } else if (error.request) {
      console.error('Network Error - Please check your connection')
    } else {
      console.error('Request Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export const get = <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.get<T>(url, config).then((response) => response.data)
}

export const post = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  return apiClient.post<T>(url, data, config).then((response) => response.data)
}

export const patch = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  return apiClient.patch<T>(url, data, config).then((response) => response.data)
}
