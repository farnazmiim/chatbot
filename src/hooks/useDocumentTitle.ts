import { useEffect } from 'react'

const DEFAULT_TITLE = 'همیار بات | دستیار هوشمند همراه اول'

export function useDocumentTitle(title: string | null) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} | همیار بات` : DEFAULT_TITLE
    return () => {
      document.title = previous
    }
  }, [title])
}
