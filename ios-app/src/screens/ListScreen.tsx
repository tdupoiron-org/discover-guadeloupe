import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import { SiteCard } from '../components/SiteCard'
import { guadeloupeSites } from '../data/sites'
import { useTheme } from '../contexts/ThemeContext'
import { useVisitedSites } from '../contexts/VisitedSitesContext'
import { useTranslation } from 'react-i18next'

export const ListScreen: React.FC = () => {
  const { colors, theme } = useTheme()
  const { t } = useTranslation()
  const { visitedSites, toggleVisit } = useVisitedSites()
  const [filter, setFilter] = useState<'all' | 'visited' | 'unvisited'>('all')

  const filteredSites = guadeloupeSites.filter((site) => {
    if (filter === 'visited') return visitedSites.includes(site.id)
    if (filter === 'unvisited') return !visitedSites.includes(site.id)
    return true
  })

  const visitedCount = visitedSites.length
  const totalCount = guadeloupeSites.length
  const progressPercentage = (visitedCount / totalCount) * 100

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>📍 {t('app_title')}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t('welcome_message')}
          </Text>
        </View>

        <View style={styles.filters}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'all' && { backgroundColor: colors.primary },
              filter !== 'all' && { backgroundColor: colors.secondary },
              { marginRight: 8, marginBottom: 8 },
            ]}
            onPress={() => setFilter('all')}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color: filter === 'all' ? colors.primaryText : colors.secondaryText,
                },
              ]}
            >
              {t('all_sites')} ({totalCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'unvisited' && { backgroundColor: colors.primary },
              filter !== 'unvisited' && { backgroundColor: colors.secondary },
              { marginRight: 8, marginBottom: 8 },
            ]}
            onPress={() => setFilter('unvisited')}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color:
                    filter === 'unvisited' ? colors.primaryText : colors.secondaryText,
                },
              ]}
            >
              {t('to_visit')} ({totalCount - visitedCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'visited' && { backgroundColor: colors.primary },
              filter !== 'visited' && { backgroundColor: colors.secondary },
              { marginBottom: 8 },
            ]}
            onPress={() => setFilter('visited')}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color: filter === 'visited' ? colors.primaryText : colors.secondaryText,
                },
              ]}
            >
              ✓ {t('visited')} ({visitedCount})
            </Text>
          </TouchableOpacity>
        </View>

        {visitedCount > 0 && (
          <View style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressTitle, { color: colors.text }]}>
                {t('your_progress')}
              </Text>
              <Text style={[styles.progressCount, { color: colors.textSecondary }]}>
                {visitedCount} / {totalCount}
              </Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: colors.secondary }]}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progressPercentage}%`, backgroundColor: colors.primary },
                ]}
              />
            </View>
          </View>
        )}

        {filteredSites.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              {filter === 'visited' && visitedCount === 0
                ? t('start_exploring')
                : filter === 'visited' && visitedCount === totalCount
                ? t('congratulations')
                : t('no_sites')}
            </Text>
          </View>
        ) : (
          <View style={styles.sitesList}>
            {filteredSites.map((site) => (
              <SiteCard
                key={site.id}
                site={site}
                isVisited={visitedSites.includes(site.id)}
                onToggleVisit={toggleVisit}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  progressCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressCount: {
    fontSize: 13,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  emptyState: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  sitesList: {
    marginBottom: 16,
  },
})
