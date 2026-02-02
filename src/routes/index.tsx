import { lazy, type ReactElement } from 'react'
import { type RouteObject } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

export const ROUTE_PATHS = {
  VERIFY_CODE: '/verify-code',
  HOME: '/',
  CHAT: '/chat',
  SETTINGS: '/settings',
} as const

const Login = lazy(() => import('../pages/Login/Login'))
const Chat = lazy(() => import('../pages/Chat/Chat'))
const Settings = lazy(() => import('../pages/Settings/Settings'))
const VerifyCode = lazy(() => import('../pages/VerifyCode/VerifyCode'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))

const createProtectedRoute = (path: string, element: ReactElement): RouteObject => ({
  path,
  element: <ProtectedRoute>{element}</ProtectedRoute>,
})

export const routes: RouteObject[] = [
  { path: ROUTE_PATHS.HOME, element: <Login /> },
  { path: ROUTE_PATHS.VERIFY_CODE, element: <VerifyCode /> },
  { path: ROUTE_PATHS.CHAT, element: <Chat /> },
  createProtectedRoute(ROUTE_PATHS.SETTINGS, <Settings />),
  { path: '*', element: <NotFound /> },
]
