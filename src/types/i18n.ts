import 'react-i18next'
import common from '@/locales/en/common.json'
import sites from '@/locales/en/sites.json'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof common
      sites: typeof sites
    }
  }
}
