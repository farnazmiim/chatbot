export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
  error?: string
}

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

export interface Conversation {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  messageCount: number
}

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
