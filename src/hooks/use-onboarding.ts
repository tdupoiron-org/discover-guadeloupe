import { useState, useEffect } from 'react'

const ONBOARDING_STORAGE_KEY = 'discover-sevilla-onboarding-completed'

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_STORAGE_KEY)
    
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true)
    }
    setIsLoading(false)
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true')
    setShowOnboarding(false)
  }

  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_STORAGE_KEY)
    setShowOnboarding(true)
  }

  return {
    showOnboarding,
    isLoading,
    completeOnboarding,
    resetOnboarding
  }
}
