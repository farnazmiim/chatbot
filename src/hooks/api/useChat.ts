import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  sendMessage,
  getConversations,
  getConversation,
  getMessages,
  deleteConversation,
} from '../../lib/api/services/chatService'
import type { ChatRequest } from '../../lib/api/types'

// Query keys
export const chatKeys = {
  all: ['chat'] as const,
  conversations: () => [...chatKeys.all, 'conversations'] as const,
  conversation: (id: string) => [...chatKeys.all, 'conversation', id] as const,
  messages: (conversationId: string) => [...chatKeys.all, 'messages', conversationId] as const,
}

// Hook for sending a message
export const useSendMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ChatRequest) => sendMessage(data),
    onSuccess: (response, variables) => {
      if (response.success && variables.conversationId) {
        // Invalidate messages for this conversation
        queryClient.invalidateQueries({
          queryKey: chatKeys.messages(variables.conversationId),
        })
        // Invalidate conversations list
        queryClient.invalidateQueries({
          queryKey: chatKeys.conversations(),
        })
      }
    },
  })
}

// Hook for getting all conversations
export const useConversations = () => {
  return useQuery({
    queryKey: chatKeys.conversations(),
    queryFn: async () => {
      const response = await getConversations()
      return response.data
    },
  })
}

// Hook for getting a specific conversation
export const useConversation = (id: string) => {
  return useQuery({
    queryKey: chatKeys.conversation(id),
    queryFn: async () => {
      const response = await getConversation(id)
      return response.data
    },
    enabled: !!id,
  })
}

// Hook for getting messages of a conversation
export const useMessages = (conversationId: string) => {
  return useQuery({
    queryKey: chatKeys.messages(conversationId),
    queryFn: async () => {
      const response = await getMessages(conversationId)
      return response.data
    },
    enabled: !!conversationId,
  })
}

// Hook for deleting a conversation
export const useDeleteConversation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteConversation(id),
    onSuccess: () => {
      // Invalidate conversations list
      queryClient.invalidateQueries({
        queryKey: chatKeys.conversations(),
      })
    },
  })
}
