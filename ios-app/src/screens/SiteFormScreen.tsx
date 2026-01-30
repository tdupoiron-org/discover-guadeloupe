import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useTheme } from '../contexts/ThemeContext'
import { useSites } from '../contexts/SitesContext'
import { useTranslation } from 'react-i18next'
import { Site } from '../types/site'

type CrowdLevel = 'low' | 'medium' | 'high'
type Popularity = 'must-see' | 'popular' | 'hidden-gem'

interface SiteFormScreenProps {
  siteId?: string
  onClose: () => void
}

export const SiteFormScreen: React.FC<SiteFormScreenProps> = ({ siteId, onClose }) => {
  const { colors, theme } = useTheme()
  const { t } = useTranslation()
  const { addSite, updateSite, getSite } = useSites()

  const existingSite = siteId ? getSite(siteId) : undefined
  const isEditing = !!existingSite

  const [name, setName] = useState(existingSite?.name || '')
  const [description, setDescription] = useState(existingSite?.description || '')
  const [image, setImage] = useState(existingSite?.image || '')
  const [duration, setDuration] = useState(existingSite?.duration || '')
  const [crowdLevel, setCrowdLevel] = useState<CrowdLevel>(existingSite?.crowdLevel || 'medium')
  const [rating, setRating] = useState(existingSite?.rating?.toString() || '')
  const [popularity, setPopularity] = useState<Popularity>(existingSite?.popularity || 'popular')
  const [category, setCategory] = useState(existingSite?.category || '')
  const [lat, setLat] = useState(existingSite?.coordinates?.lat?.toString() || '')
  const [lng, setLng] = useState(existingSite?.coordinates?.lng?.toString() || '')

  const [imageError, setImageError] = useState(false)

  const validateForm = (): boolean => {
    if (!name.trim()) {
      Alert.alert(t('error'), t('name_required'))
      return false
    }
    if (!image.trim()) {
      Alert.alert(t('error'), t('image_required'))
      return false
    }
    if (!category.trim()) {
      Alert.alert(t('error'), t('category_required'))
      return false
    }
    if (!duration.trim()) {
      Alert.alert(t('error'), t('duration_required'))
      return false
    }
    const ratingNum = parseFloat(rating)
    if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
      Alert.alert(t('error'), t('rating_invalid'))
      return false
    }
    const latNum = parseFloat(lat)
    const lngNum = parseFloat(lng)
    if (isNaN(latNum) || isNaN(lngNum)) {
      Alert.alert(t('error'), t('coordinates_invalid'))
      return false
    }
    return true
  }

  const handleSave = () => {
    if (!validateForm()) return

    const siteData: Omit<Site, 'id'> = {
      name: name.trim(),
      description: description.trim(),
      image: image.trim(),
      duration: duration.trim(),
      crowdLevel,
      rating: parseFloat(rating),
      popularity,
      category: category.trim(),
      coordinates: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
    }

    if (isEditing && siteId) {
      updateSite(siteId, siteData)
      Alert.alert(t('success'), t('site_updated'), [{ text: 'OK', onPress: onClose }])
    } else {
      addSite(siteData)
      Alert.alert(t('success'), t('site_added'), [{ text: 'OK', onPress: onClose }])
    }
  }

  const crowdLevels: { value: CrowdLevel; label: string }[] = [
    { value: 'low', label: t('crowd_low') },
    { value: 'medium', label: t('crowd_medium') },
    { value: 'high', label: t('crowd_high') },
  ]

  const popularityOptions: { value: Popularity; label: string }[] = [
    { value: 'must-see', label: t('popularity_must_see') },
    { value: 'popular', label: t('popularity_popular') },
    { value: 'hidden-gem', label: t('popularity_hidden_gem') },
  ]

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Text style={[styles.headerButtonText, { color: colors.primary }]}>
              {t('cancel')}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {isEditing ? t('edit_site') : t('add_site')}
          </Text>
          <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
            <Text style={[styles.headerButtonText, { color: colors.primary }]}>
              {t('save')}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Image Preview */}
          {image.trim() && !imageError && (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: image }}
                style={styles.imagePreview}
                onError={() => setImageError(true)}
              />
            </View>
          )}
          {imageError && image.trim() && (
            <View style={[styles.imageErrorContainer, { backgroundColor: colors.card }]}>
              <Text style={[styles.imageErrorText, { color: colors.destructive }]}>
                {t('image_load_error')}
              </Text>
            </View>
          )}

          {/* Basic Info Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t('basic_info')}
            </Text>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>{t('site_name')} *</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                value={name}
                onChangeText={setName}
                placeholder={t('site_name_placeholder')}
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>{t('description')}</Text>
              <TextInput
                style={[styles.input, styles.textArea, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                value={description}
                onChangeText={setDescription}
                placeholder={t('description_placeholder')}
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>{t('image_url')} *</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                value={image}
                onChangeText={(text) => {
                  setImage(text)
                  setImageError(false)
                }}
                placeholder={t('image_url_placeholder')}
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
                keyboardType="url"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>{t('category')} *</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                value={category}
                onChangeText={setCategory}
                placeholder={t('category_placeholder')}
                placeholderTextColor={colors.textSecondary}
              />
            </View>
          </View>

          {/* Metadata Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t('metadata')}
            </Text>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>{t('visit_duration')} *</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                value={duration}
                onChangeText={setDuration}
                placeholder={t('duration_placeholder')}
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>{t('rating')} (0-5) *</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                value={rating}
                onChangeText={setRating}
                placeholder="4.5"
                placeholderTextColor={colors.textSecondary}
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>{t('crowd_level')}</Text>
              <View style={styles.optionsRow}>
                {crowdLevels.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionButton,
                      { 
                        backgroundColor: crowdLevel === option.value ? colors.primary : colors.card,
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={() => setCrowdLevel(option.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        { color: crowdLevel === option.value ? colors.primaryText : colors.text },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>{t('popularity')}</Text>
              <View style={styles.optionsRow}>
                {popularityOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionButton,
                      { 
                        backgroundColor: popularity === option.value ? colors.primary : colors.card,
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={() => setPopularity(option.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        { color: popularity === option.value ? colors.primaryText : colors.text },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Location Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t('location')}
            </Text>

            <View style={styles.coordinatesRow}>
              <View style={[styles.inputGroup, styles.coordinateInput]}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>{t('latitude')} *</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                  value={lat}
                  onChangeText={setLat}
                  placeholder="16.0447"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={[styles.inputGroup, styles.coordinateInput]}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>{t('longitude')} *</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                  value={lng}
                  onChangeText={setLng}
                  placeholder="-61.6638"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numbers-and-punctuation"
                />
              </View>
            </View>
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
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
  imagePreviewContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageErrorContainer: {
    marginBottom: 16,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  imageErrorText: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  coordinatesRow: {
    flexDirection: 'row',
    gap: 16,
  },
  coordinateInput: {
    flex: 1,
  },
  bottomPadding: {
    height: 40,
  },
})
