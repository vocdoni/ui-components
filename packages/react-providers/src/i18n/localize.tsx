import { useTranslation } from 'react-i18next'
import { reactProvidersNamespace } from './locales'

const useLocalize = () => {
  const { t } = useTranslation(reactProvidersNamespace)
  return (key: string, substitutions?: Record<string, unknown>) => t(key, substitutions)
}

export { useLocalize }
