import { type ReactElement } from 'react'
import { type RouteObject } from 'react-router-dom'
import Welcome from '../pages/Welcome/Welcome'
import Chat from '../pages/Chat/Chat'
import VideoChat from '../pages/VideoChat/VideoChat'
import Settings from '../pages/Settings/Settings'
import History from '../pages/History/History'
import Login from '../pages/Login/Login'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import PublicRoute from '../components/PublicRoute/PublicRoute'

// Route paths constants
export const ROUTE_PATHS = {
  LOGIN: '/login',
  HOME: '/',
  CHAT: '/chat',
  VIDEO_CHAT: '/video-chat',
  SETTINGS: '/settings',
  HISTORY: '/history',
} as const

// Helper function to create protected route
const createProtectedRoute = (path: string, element: ReactElement): RouteObject => ({
  path,
  element: <ProtectedRoute>{element}</ProtectedRoute>,
})

// Helper function to create public route
const createPublicRoute = (path: string, element: ReactElement): RouteObject => ({
  path,
  element: <PublicRoute>{element}</PublicRoute>,
})

// Public routes (accessible without authentication)
const publicRoutes: RouteObject[] = [
  createPublicRoute(ROUTE_PATHS.LOGIN, <Login />),
]

// Protected routes (require authentication)
const protectedRoutes: RouteObject[] = [
  createProtectedRoute(ROUTE_PATHS.HOME, <Welcome />),
  createProtectedRoute(ROUTE_PATHS.CHAT, <Chat />),
  createProtectedRoute(ROUTE_PATHS.VIDEO_CHAT, <VideoChat />),
  createProtectedRoute(ROUTE_PATHS.SETTINGS, <Settings />),
  createProtectedRoute(ROUTE_PATHS.HISTORY, <History />),
]

// Combine all routes
export const routes: RouteObject[] = [
  ...publicRoutes,
  ...protectedRoutes,
]
