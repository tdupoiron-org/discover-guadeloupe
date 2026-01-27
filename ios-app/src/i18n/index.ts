import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import en from './locales/en.json'
import fr from './locales/fr.json'
import de from './locales/de.json'

const LANGUAGE_STORAGE_KEY = '@app_language'

// Custom language detector that uses AsyncStorage
const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY)
      callback(savedLanguage || 'en')
    } catch (error) {
      console.error('Error loading language:', error)
      callback('en')
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lng)
    } catch (error) {
      console.error('Error saving language:', error)
    }
  },
}

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      de: { translation: de }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
