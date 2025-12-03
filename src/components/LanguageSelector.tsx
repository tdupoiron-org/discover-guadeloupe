import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Globe } from '@phosphor-icons/react'

export function LanguageSelector() {
  const { i18n, t } = useTranslation()

  const languages = [
    { code: 'en', label: t('language.en') },
    { code: 'de', label: t('language.de') },
    { code: 'fr', label: t('language.fr') },
    { code: 'es', label: t('language.es') },
    { code: 'zh', label: t('language.zh') },
  ]

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value)
    localStorage.setItem('language', value)
  }

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px]" aria-label={t('language.select')}>
        <Globe className="w-4 h-4 mr-2" weight="fill" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
