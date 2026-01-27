// انواع عمومی برای API responses

// Response استاندارد از سرور
export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
  error?: string
}

// Response برای pagination
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Response برای خطا
export interface ApiError {
  message: string
  code?: string
  errors?: Record<string, string[]>
}

// انواع برای Authentication
export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    username: string
    email?: string
  }
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

// انواع برای Chat
export interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
  conversationId?: string
}

export interface ChatRequest {
  message: string
  conversationId?: string
}

export interface ChatResponse {
  message: ChatMessage
  conversationId: string
}

// انواع برای Conversation/History
export interface Conversation {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  messageCount: number
}

// انواع برای Settings
export interface UserSettings {
  theme: 'light' | 'dark'
  fontSize: number
  language?: string
  notifications?: boolean
}

export interface UpdateSettingsRequest {
  theme?: 'light' | 'dark'
  fontSize?: number
  language?: string
  notifications?: boolean
}
