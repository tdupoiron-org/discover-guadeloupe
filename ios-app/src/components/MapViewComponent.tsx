import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native'
import MapView, { Marker, Callout, PROVIDER_DEFAULT } from 'react-native-maps'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { Site } from '../types/site'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from 'react-i18next'
import { getMarkerColor } from '../utils/colors'

interface MapViewComponentProps {
  sites: Site[]
  visitedSites: string[]
  onToggleVisit: (siteId: string) => void
}

const { width } = Dimensions.get('window')

export const MapViewComponent: React.FC<MapViewComponentProps> = ({
  sites,
  visitedSites,
  onToggleVisit,
}) => {
  const { colors, theme } = useTheme()
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          setLocationError('Location permission denied')
          return
        }

        await Location.getCurrentPositionAsync({})
      } catch (error) {
        setLocationError('Error getting location')
        console.error('Location error:', error)
      }
    })()
  }, [])

  // Show alert if location access was denied
  useEffect(() => {
    if (locationError) {
      Alert.alert(
        'Location Access',
        'Location permission is needed to show your position on the map.',
        [{ text: 'OK' }]
      )
    }
  }, [locationError])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: 16.2,
          longitude: -61.5,
          latitudeDelta: 0.8,
          longitudeDelta: 0.8,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        customMapStyle={theme === 'dark' ? darkMapStyle : []}
      >
        {sites.map((site) => {
          const isVisited = visitedSites.includes(site.id)
          return (
            <Marker
              key={site.id}
              coordinate={{
                latitude: site.coordinates.lat,
                longitude: site.coordinates.lng,
              }}
              pinColor={getMarkerColor(site, isVisited)}
            >
              <Callout style={styles.callout}>
                <View style={[styles.calloutContainer, { backgroundColor: colors.card }]}>
                  <Image source={{ uri: site.image }} style={styles.calloutImage} />
                  
                  <View style={styles.calloutContent}>
                    <Text style={[styles.calloutCategory, { color: colors.textSecondary }]}>
                      {site.category}
                    </Text>
                    <Text style={[styles.calloutTitle, { color: colors.text }]}>
                      {site.name}
                    </Text>
                    <Text
                      style={[styles.calloutDescription, { color: colors.textSecondary }]}
                      numberOfLines={2}
                    >
                      {site.description}
                    </Text>
                    
                    <View style={styles.calloutMetadata}>
                      <View style={styles.calloutMetadataItem}>
                        <Text style={styles.calloutMetadataEmoji}>⏱</Text>
                        <Text style={[styles.calloutMetadataText, { color: colors.text }]}>
                          {site.duration}
                        </Text>
                      </View>
                      <View style={[styles.calloutMetadataItem, { marginLeft: 16 }]}>
                        <Text style={styles.calloutMetadataEmoji}>⭐</Text>
                        <Text style={[styles.calloutMetadataText, { color: colors.text }]}>
                          {site.rating}
                        </Text>
                      </View>
                    </View>
                    
                    <TouchableOpacity
                      style={[
                        styles.calloutButton,
                        { backgroundColor: isVisited ? colors.secondary : colors.primary },
                      ]}
                      onPress={() => onToggleVisit(site.id)}
                    >
                      <Text
                        style={[
                          styles.calloutButtonText,
                          { color: isVisited ? colors.secondaryText : colors.primaryText },
                        ]}
                      >
                        {isVisited ? '✓ ' + t('visited') : t('mark_visited')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>
    </View>
  )
}

const darkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#94a3b8' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#0f172a' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#334155' }],
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  callout: {
    width: 280,
  },
  calloutContainer: {
    width: 280,
    borderRadius: 12,
    overflow: 'hidden',
  },
  calloutImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  calloutContent: {
    padding: 12,
  },
  calloutCategory: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  calloutDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 10,
  },
  calloutMetadata: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  calloutMetadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calloutMetadataEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  calloutMetadataText: {
    fontSize: 12,
    fontWeight: '600',
  },
  calloutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  calloutButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
})
