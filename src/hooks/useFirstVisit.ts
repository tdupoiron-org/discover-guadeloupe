import { useState, useEffect } from 'react'

const FIRST_VISIT_KEY = 'discover-sevilla-first-visit'

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const hasVisited = localStorage.getItem(FIRST_VISIT_KEY)
      
      if (!hasVisited) {
        setIsFirstVisit(true)
      }
    } catch (error) {
      // localStorage may not be available in some environments (SSR, private browsing)
      console.warn('localStorage not available:', error)
    }
    
    setIsLoading(false)
  }, [])

  const markAsVisited = () => {
    try {
      localStorage.setItem(FIRST_VISIT_KEY, 'true')
      setIsFirstVisit(false)
    } catch (error) {
      // localStorage may not be available in some environments
      console.warn('Could not save to localStorage:', error)
      setIsFirstVisit(false)
    }
  }

  return { isFirstVisit, isLoading, markAsVisited }
}
