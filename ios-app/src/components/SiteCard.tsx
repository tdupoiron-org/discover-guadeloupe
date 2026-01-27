import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Site } from '../types/site'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from 'react-i18next'
import { getCrowdColor, getPopularityEmoji, hexToRgba } from '../utils/colors'

interface SiteCardProps {
  site: Site
  isVisited: boolean
  onToggleVisit: (siteId: string) => void
}

const { width } = Dimensions.get('window')
const cardWidth = width - 32

export const SiteCard: React.FC<SiteCardProps> = ({ site, isVisited, onToggleVisit }) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const crowdColor = getCrowdColor(site.crowdLevel, colors)
  const popularityEmoji = getPopularityEmoji(site.popularity)

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: site.image }} style={styles.image} />
        {isVisited && (
          <View style={styles.visitedOverlay}>
            <View style={[styles.visitedBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.visitedText, { color: colors.primaryText }]}>✓</Text>
            </View>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.category, { color: colors.textSecondary }]}>{site.category}</Text>
          <Text style={styles.popularityEmoji}>{popularityEmoji}</Text>
        </View>
        
        <Text style={[styles.name, { color: colors.text }]}>{site.name}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={3}>
          {site.description}
        </Text>
        
        <View style={styles.metadata}>
          <View style={styles.metadataItem}>
            <Text style={[styles.metadataLabel, { color: colors.textSecondary }]}>⏱</Text>
            <Text style={[styles.metadataValue, { color: colors.text }]}>{site.duration}</Text>
          </View>
          
          <View style={[styles.metadataItem, { marginLeft: 16 }]}>
            <Text style={[styles.metadataLabel, { color: colors.textSecondary }]}>👥</Text>
            <View style={[styles.crowdBadge, { backgroundColor: hexToRgba(crowdColor, 0.2) }]}>
              <Text style={[styles.crowdText, { color: crowdColor }]}>
                {site.crowdLevel}
              </Text>
            </View>
          </View>
          
          <View style={[styles.metadataItem, { marginLeft: 16 }]}>
            <Text style={[styles.metadataLabel, { color: colors.textSecondary }]}>⭐</Text>
            <Text style={[styles.metadataValue, { color: colors.text }]}>{site.rating}</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isVisited ? colors.secondary : colors.primary }]}
          onPress={() => onToggleVisit(site.id)}
        >
          <Text style={[styles.buttonText, { color: isVisited ? colors.secondaryText : colors.primaryText }]}>
            {isVisited ? t('mark_unvisited') : t('mark_visited')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    width: cardWidth,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  visitedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  visitedBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visitedText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  popularityEmoji: {
    fontSize: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataLabel: {
    fontSize: 16,
    marginRight: 4,
  },
  metadataValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  crowdBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  crowdText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
})
