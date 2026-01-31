import { type ReactElement } from 'react'
import { type RouteObject } from 'react-router-dom'
import Welcome from '../pages/Welcome/Welcome'
import Chat from '../pages/Chat/Chat'
import VideoChat from '../pages/VideoChat/VideoChat'
import Settings from '../pages/Settings/Settings'
import History from '../pages/History/History'
import VerifyCode from '../pages/VerifyCode/VerifyCode'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

const ROUTE_PATHS = {
  VERIFY_CODE: '/verify-code',
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

const protectedRoutes: RouteObject[] = [
  createProtectedRoute(ROUTE_PATHS.CHAT, <Chat />),
  createProtectedRoute(ROUTE_PATHS.VIDEO_CHAT, <VideoChat />),
  createProtectedRoute(ROUTE_PATHS.SETTINGS, <Settings />),
  createProtectedRoute(ROUTE_PATHS.HISTORY, <History />),
]

export const routes: RouteObject[] = [
  { path: ROUTE_PATHS.HOME, element: <Welcome /> },
  { path: ROUTE_PATHS.VERIFY_CODE, element: <VerifyCode /> },
  ...protectedRoutes,
]
