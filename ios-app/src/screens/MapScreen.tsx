import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { MapViewComponent } from '../components/MapViewComponent'
import { guadeloupeSites } from '../data/sites'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from 'react-i18next'

export const MapScreen: React.FC = () => {
  const { colors, theme } = useTheme()
  const { t } = useTranslation()
  const [visitedSites, setVisitedSites] = useState<string[]>([])

  const toggleVisit = (siteId: string) => {
    setVisitedSites((current) => {
      if (current.includes(siteId)) {
        return current.filter((id) => id !== siteId)
      }
      return [...current, siteId]
    })
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>🗺️ {t('map')}</Text>
      </View>

      <MapViewComponent
        sites={guadeloupeSites}
        visitedSites={visitedSites}
        onToggleVisit={toggleVisit}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
