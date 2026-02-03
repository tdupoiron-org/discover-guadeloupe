import { useState, useEffect } from 'react'
import { SiteRating } from '@/types/site'

const STORAGE_KEY = 'site-ratings'

export function useSiteRatings() {
  const [ratings, setRatings] = useState<SiteRating[]>([])

  // Load ratings from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setRatings(JSON.parse(stored))
      } catch (error) {
        console.error('Error loading site ratings:', error)
      }
    }
  }, [])

  // Save ratings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings))
  }, [ratings])

  const setRating = (siteId: string, rating: number) => {
    setRatings((current) => {
      const existing = current.find(r => r.siteId === siteId)
      if (existing) {
        return current.map(r => 
          r.siteId === siteId ? { ...r, rating } : r
        )
      }
      return [...current, { siteId, rating }]
    })
  }

  const getRating = (siteId: string): number | null => {
    const rating = ratings.find(r => r.siteId === siteId)
    return rating?.rating ?? null
  }

  const clearRating = (siteId: string) => {
    setRatings((current) => current.filter(r => r.siteId !== siteId))
  }

  return {
    ratings,
    setRating,
    getRating,
    clearRating,
  }
}
