import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SiteRating } from '../types/site'

interface RatingSitesContextType {
  ratings: SiteRating[]
  setRating: (siteId: string, rating: number) => void
  getRating: (siteId: string) => number | null
  clearRating: (siteId: string) => void
}

const RatingSitesContext = createContext<RatingSitesContextType | undefined>(undefined)

const STORAGE_KEY = '@site_ratings'

export const RatingSitesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ratings, setRatings] = useState<SiteRating[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load ratings from storage on mount
  useEffect(() => {
    const loadRatings = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY)
        if (stored) {
          setRatings(JSON.parse(stored))
        }
      } catch (error) {
        console.error('Error loading site ratings:', error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadRatings()
  }, [])

  // Save ratings to storage whenever they change
  useEffect(() => {
    if (isLoaded) {
      const saveRatings = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ratings))
        } catch (error) {
          console.error('Error saving site ratings:', error)
        }
      }

      saveRatings()
    }
  }, [ratings, isLoaded])

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

  return (
    <RatingSitesContext.Provider value={{ ratings, setRating, getRating, clearRating }}>
      {children}
    </RatingSitesContext.Provider>
  )
}

export const useRatingSites = (): RatingSitesContextType => {
  const context = useContext(RatingSitesContext)
  if (!context) {
    throw new Error('useRatingSites must be used within a RatingSitesProvider')
  }
  return context
}
