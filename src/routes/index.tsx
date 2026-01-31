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

const ROUTE_PATHS = {
  LOGIN: '/login',
  HOME: '/',
  CHAT: '/chat',
  VIDEO_CHAT: '/video-chat',
  SETTINGS: '/settings',
  HISTORY: '/history',
} as const

const createProtectedRoute = (path: string, element: ReactElement): RouteObject => ({
  path,
  element: <ProtectedRoute>{element}</ProtectedRoute>,
})

const createPublicRoute = (path: string, element: ReactElement): RouteObject => ({
  path,
  element: <PublicRoute>{element}</PublicRoute>,
})

const publicRoutes: RouteObject[] = [
  createPublicRoute(ROUTE_PATHS.LOGIN, <Login />),
]

const protectedRoutes: RouteObject[] = [
  createProtectedRoute(ROUTE_PATHS.HOME, <Welcome />),
  createProtectedRoute(ROUTE_PATHS.CHAT, <Chat />),
  createProtectedRoute(ROUTE_PATHS.VIDEO_CHAT, <VideoChat />),
  createProtectedRoute(ROUTE_PATHS.SETTINGS, <Settings />),
  createProtectedRoute(ROUTE_PATHS.HISTORY, <History />),
]

export const routes: RouteObject[] = [
  ...publicRoutes,
  ...protectedRoutes,
]
