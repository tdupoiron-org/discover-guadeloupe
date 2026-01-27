import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface VisitedSitesContextType {
  visitedSites: string[]
  toggleVisit: (siteId: string) => void
  isVisited: (siteId: string) => boolean
}

const VisitedSitesContext = createContext<VisitedSitesContextType | undefined>(undefined)

const STORAGE_KEY = '@visited_sites'

export const VisitedSitesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visitedSites, setVisitedSites] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load visited sites from storage on mount
  useEffect(() => {
    const loadVisitedSites = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY)
        if (stored) {
          setVisitedSites(JSON.parse(stored))
        }
      } catch (error) {
        console.error('Error loading visited sites:', error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadVisitedSites()
  }, [])

  // Save visited sites to storage whenever they change
  useEffect(() => {
    if (isLoaded) {
      const saveVisitedSites = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(visitedSites))
        } catch (error) {
          console.error('Error saving visited sites:', error)
        }
      }

      saveVisitedSites()
    }
  }, [visitedSites, isLoaded])

  const toggleVisit = (siteId: string) => {
    setVisitedSites((current) => {
      if (current.includes(siteId)) {
        return current.filter((id) => id !== siteId)
      }
      return [...current, siteId]
    })
  }

  const isVisited = (siteId: string) => {
    return visitedSites.includes(siteId)
  }

  return (
    <VisitedSitesContext.Provider value={{ visitedSites, toggleVisit, isVisited }}>
      {children}
    </VisitedSitesContext.Provider>
  )
}

export const useVisitedSites = () => {
  const context = useContext(VisitedSitesContext)
  if (context === undefined) {
    throw new Error('useVisitedSites must be used within a VisitedSitesProvider')
  }
  return context
}
