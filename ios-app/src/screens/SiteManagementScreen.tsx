import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  Modal,
} from 'react-native'
import { useTheme } from '../contexts/ThemeContext'
import { useSites } from '../contexts/SitesContext'
import { useTranslation } from 'react-i18next'
import { SiteFormScreen } from './SiteFormScreen'
import { Site } from '../types/site'

interface SiteManagementScreenProps {
  onClose: () => void
}

export const SiteManagementScreen: React.FC<SiteManagementScreenProps> = ({ onClose }) => {
  const { colors, theme } = useTheme()
  const { t } = useTranslation()
  const { sites, deleteSite, resetToDefault } = useSites()

  const [showForm, setShowForm] = useState(false)
  const [editingSiteId, setEditingSiteId] = useState<string | undefined>(undefined)

  const handleAddSite = () => {
    setEditingSiteId(undefined)
    setShowForm(true)
  }

  const handleEditSite = (siteId: string) => {
    setEditingSiteId(siteId)
    setShowForm(true)
  }

  const handleDeleteSite = (site: Site) => {
    Alert.alert(
      t('delete_site'),
      t('delete_site_confirm', { name: site.name }),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: () => deleteSite(site.id),
        },
      ]
    )
  }

  const handleResetToDefault = () => {
    Alert.alert(
      t('reset_sites'),
      t('reset_sites_confirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('reset'),
          style: 'destructive',
          onPress: resetToDefault,
        },
      ]
    )
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingSiteId(undefined)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onClose} style={styles.headerButton}>
          <Text style={[styles.headerButtonText, { color: colors.primary }]}>
            {t('close')}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t('manage_sites')}
        </Text>
        <TouchableOpacity onPress={handleAddSite} style={styles.headerButton}>
          <Text style={[styles.headerButtonText, { color: colors.primary }]}>
            + {t('add')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsCard}>
          <Text style={[styles.statsText, { color: colors.textSecondary }]}>
            {t('total_sites')}: {sites.length}
          </Text>
        </View>

        {sites.map((site) => (
          <View
            key={site.id}
            style={[styles.siteItem, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.siteContent}>
              <Image source={{ uri: site.image }} style={styles.siteThumbnail} />
              <View style={styles.siteInfo}>
                <Text style={[styles.siteName, { color: colors.text }]} numberOfLines={1}>
                  {site.name}
                </Text>
                <Text style={[styles.siteCategory, { color: colors.textSecondary }]}>
                  {site.category}
                </Text>
                <View style={styles.siteMetadata}>
                  <Text style={[styles.metadataText, { color: colors.textSecondary }]}>
                    ⭐ {site.rating}
                  </Text>
                  <Text style={[styles.metadataText, { color: colors.textSecondary }]}>
                    ⏱ {site.duration}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.secondary }]}
                onPress={() => handleEditSite(site.id)}
              >
                <Text style={[styles.actionButtonText, { color: colors.secondaryText }]}>
                  {t('edit')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.destructive }]}
                onPress={() => handleDeleteSite(site)}
              >
                <Text style={[styles.actionButtonText, { color: '#fff' }]}>
                  {t('delete')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.resetButton, { borderColor: colors.destructive }]}
          onPress={handleResetToDefault}
        >
          <Text style={[styles.resetButtonText, { color: colors.destructive }]}>
            {t('reset_to_default')}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <Modal
        visible={showForm}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SiteFormScreen
          siteId={editingSiteId}
          onClose={handleFormClose}
        />
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    minWidth: 60,
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  statsCard: {
    marginBottom: 16,
    padding: 12,
    alignItems: 'center',
  },
  statsText: {
    fontSize: 14,
    fontWeight: '500',
  },
  siteItem: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  siteContent: {
    flexDirection: 'row',
    padding: 12,
  },
  siteThumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  siteInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  siteName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  siteCategory: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  siteMetadata: {
    flexDirection: 'row',
    gap: 12,
  },
  metadataText: {
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  resetButton: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
})
