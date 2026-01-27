import { get, post } from '../apiClient'
import type { ApiResponse, ChatRequest, ChatResponse, Conversation, ChatMessage } from '../types'

// Chat API endpoints
const CHAT_ENDPOINTS = {
  SEND_MESSAGE: '/chat/message',
  GET_CONVERSATIONS: '/chat/conversations',
  GET_CONVERSATION: '/chat/conversations/:id',
  DELETE_CONVERSATION: '/chat/conversations/:id',
  GET_MESSAGES: '/chat/conversations/:id/messages',
} as const

// Send a chat message
export const sendMessage = async (data: ChatRequest): Promise<ApiResponse<ChatResponse>> => {
  return post<ApiResponse<ChatResponse>>(CHAT_ENDPOINTS.SEND_MESSAGE, data)
}

// Get all conversations
export const getConversations = async (): Promise<ApiResponse<Conversation[]>> => {
  return get<ApiResponse<Conversation[]>>(CHAT_ENDPOINTS.GET_CONVERSATIONS)
}

// Get a specific conversation
export const getConversation = async (id: string): Promise<ApiResponse<Conversation>> => {
  return get<ApiResponse<Conversation>>(CHAT_ENDPOINTS.GET_CONVERSATION.replace(':id', id))
}

// Get messages for a conversation
export const getMessages = async (conversationId: string): Promise<ApiResponse<ChatMessage[]>> => {
  return get<ApiResponse<ChatMessage[]>>(
    CHAT_ENDPOINTS.GET_MESSAGES.replace(':id', conversationId)
  )
}

// Delete a conversation
export const deleteConversation = async (id: string): Promise<ApiResponse<void>> => {
  return get<ApiResponse<void>>(CHAT_ENDPOINTS.DELETE_CONVERSATION.replace(':id', id))
}
