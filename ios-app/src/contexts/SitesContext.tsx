import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Site } from '../types/site'
import { guadeloupeSites } from '../data/sites'

interface SitesContextType {
  sites: Site[]
  addSite: (site: Omit<Site, 'id'>) => void
  deleteSite: (siteId: string) => void
  updateSite: (siteId: string, updates: Partial<Omit<Site, 'id'>>) => void
  getSite: (siteId: string) => Site | undefined
  resetToDefault: () => void
  isLoaded: boolean
}

const SitesContext = createContext<SitesContextType | undefined>(undefined)

const STORAGE_KEY = '@managed_sites'

const generateId = (): string => {
  return `site-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const SitesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sites, setSites] = useState<Site[]>(guadeloupeSites)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load sites from storage on mount
  useEffect(() => {
    const loadSites = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsedSites = JSON.parse(stored)
          if (Array.isArray(parsedSites) && parsedSites.length > 0) {
            setSites(parsedSites)
          }
        }
      } catch (error) {
        console.error('Error loading sites:', error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadSites()
  }, [])

  // Save sites to storage whenever they change
  useEffect(() => {
    if (isLoaded) {
      const saveSites = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sites))
        } catch (error) {
          console.error('Error saving sites:', error)
        }
      }

      saveSites()
    }
  }, [sites, isLoaded])

  const addSite = (siteData: Omit<Site, 'id'>) => {
    const newSite: Site = {
      ...siteData,
      id: generateId(),
    }
    setSites((current) => [...current, newSite])
  }

  const deleteSite = (siteId: string) => {
    setSites((current) => current.filter((site) => site.id !== siteId))
  }

  const updateSite = (siteId: string, updates: Partial<Omit<Site, 'id'>>) => {
    setSites((current) =>
      current.map((site) =>
        site.id === siteId ? { ...site, ...updates } : site
      )
    )
  }

  const getSite = (siteId: string): Site | undefined => {
    return sites.find((site) => site.id === siteId)
  }

  const resetToDefault = () => {
    setSites(guadeloupeSites)
  }

  return (
    <SitesContext.Provider
      value={{ sites, addSite, deleteSite, updateSite, getSite, resetToDefault, isLoaded }}
    >
      {children}
    </SitesContext.Provider>
  )
}

export const useSites = () => {
  const context = useContext(SitesContext)
  if (context === undefined) {
    throw new Error('useSites must be used within a SitesProvider')
  }
  return context
}
