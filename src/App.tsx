import { useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { queryClient } from './lib/react-query/queryClient'
import { useThemeStore } from './store/themeStore'

function FontSizeSync() {
  const fontSize = useThemeStore((s) => s.fontSize)
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
  }, [fontSize])
  return null
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FontSizeSync />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
