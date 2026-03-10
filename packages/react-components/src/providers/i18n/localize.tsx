import { useTranslation } from 'react-i18next'
import { reactComponentsNamespace } from '~i18n/locales'

const useLocalize = () => {
  const { t } = useTranslation(reactComponentsNamespace)
  return (key: string, substitutions?: Record<string, unknown>) => t(key, substitutions)
}

export { useLocalize }
