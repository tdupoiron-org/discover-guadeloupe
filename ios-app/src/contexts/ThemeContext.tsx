import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useColorScheme } from 'react-native'
import * as SystemUI from 'expo-system-ui'
import AsyncStorage from '@react-native-async-storage/async-storage'

type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: 'light' | 'dark'
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  colors: typeof lightColors
}

const lightColors = {
  background: '#ffffff',
  card: '#f8fafc',
  text: '#0f172a',
  textSecondary: '#64748b',
  primary: '#3b82f6',
  primaryText: '#ffffff',
  secondary: '#e2e8f0',
  secondaryText: '#475569',
  border: '#e2e8f0',
  destructive: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  accent: '#f59e0b',
}

const darkColors = {
  background: '#0f172a',
  card: '#1e293b',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  primary: '#3b82f6',
  primaryText: '#ffffff',
  secondary: '#334155',
  secondaryText: '#cbd5e1',
  border: '#334155',
  destructive: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  accent: '#f59e0b',
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = '@theme_mode'

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme()
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load theme preference on mount
  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY)
        if (stored && ['light', 'dark', 'system'].includes(stored)) {
          setThemeModeState(stored as ThemeMode)
        }
      } catch (error) {
        console.error('Error loading theme mode:', error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadThemeMode()
  }, [])

  // Save theme preference when it changes
  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode)
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode)
    } catch (error) {
      console.error('Error saving theme mode:', error)
    }
  }
  
  const theme = themeMode === 'system' ? (systemColorScheme || 'light') : themeMode
  const colors = theme === 'dark' ? darkColors : lightColors

  useEffect(() => {
    if (isLoaded) {
      // Set the system UI style based on theme
      SystemUI.setBackgroundColorAsync(colors.background)
    }
  }, [theme, colors.background, isLoaded])

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode, colors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
