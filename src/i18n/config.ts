import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translation files
import enCommon from '@/locales/en/common.json'
import enSites from '@/locales/en/sites.json'
import deCommon from '@/locales/de/common.json'
import deSites from '@/locales/de/sites.json'
import frCommon from '@/locales/fr/common.json'
import frSites from '@/locales/fr/sites.json'
import esCommon from '@/locales/es/common.json'
import esSites from '@/locales/es/sites.json'
import zhCommon from '@/locales/zh/common.json'
import zhSites from '@/locales/zh/sites.json'

// Detect language from localStorage or browser
const getInitialLanguage = (): string => {
  const stored = localStorage.getItem('language')
  if (stored && ['en', 'de', 'fr', 'es', 'zh'].includes(stored)) {
    return stored
  }
  
  const browserLang = navigator.language.split('-')[0]
  if (['en', 'de', 'fr', 'es', 'zh'].includes(browserLang)) {
    return browserLang
  }
  
  return 'en'
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        sites: enSites,
      },
      de: {
        common: deCommon,
        sites: deSites,
      },
      fr: {
        common: frCommon,
        sites: frSites,
      },
      es: {
        common: esCommon,
        sites: esSites,
      },
      zh: {
        common: zhCommon,
        sites: zhSites,
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  })

export default i18n
