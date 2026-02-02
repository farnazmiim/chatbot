import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './index'

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white" aria-hidden>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0095DA] border-t-transparent" />
    </div>
  )
}

function AppRoutes() {
  const element = useRoutes(routes)
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>
}

export default AppRoutes
