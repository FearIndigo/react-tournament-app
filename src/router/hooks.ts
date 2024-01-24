import { useCallback, useEffect, useState } from 'react'

export function useNavigate() {
  return useCallback((path: string) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, [])
}

export function useCurrentPath() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    function onLocationChange() {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', onLocationChange)
    return () => window.removeEventListener('popstate', onLocationChange)
  }, [])

  return currentPath
}
