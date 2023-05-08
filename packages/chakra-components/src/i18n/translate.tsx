import dotobject from 'dotobject'
import { createContext, ReactElement, useContext, useState } from 'react'

export type Translation = {
  [key: string]: string | Translation
}

export type Translations = {
  [language: string]: Translation
}
type TranslateFunction = (key: string, substitutions?: any) => string
type ConfigureFunction = ({
  language,
  defaultLanguage,
  translations,
}: {
  language?: string
  defaultLanguage?: string
  translations?: Translations
}) => void

const TranslationContext = createContext(
  {} as {
    configure: ConfigureFunction
    setLanguage: (lang: string) => void
    translate: TranslateFunction
    configuration: { language: string; defaultLanguage?: string }
  }
)

const TranslationProvider = ({
  language,
  defaultLanguage,
  translations,
  children,
}: {
  language?: string
  defaultLanguage?: string
  translations: Translations
  children: ReactElement
}) => {
  const validateConfiguration = ({
    language,
    defaultLanguage,
    translations,
  }: {
    language?: string
    defaultLanguage?: string
    translations?: Translations
  }) => {
    if (!language && translations) {
      language = navigator.language
      if (!translations[language]) language = language.substring(0, 2)
      if (!translations[language]) language = navigator.languages.find((language) => translations[language]) as string
      if (!translations[language])
        language = translations[defaultLanguage as string] ? defaultLanguage : Object.keys(translations)[0]
    }
    return { language, defaultLanguage, translations } as {
      translations: Translations
      language: string
      defaultLanguage?: string
    }
  }

  const [configuration, setConfiguration] = useState(
    validateConfiguration({
      translations,
      ...(language ? { language } : {}),
      ...(defaultLanguage ? { defaultLanguage } : {}),
    })
  )

  const activeTranslation = configuration.translations[configuration.language]

  const configure = (translatorConfiguration: {
    language?: string
    defaultLanguage?: string
    translations?: Translations
  }) =>
    setConfiguration(
      validateConfiguration({
        ...configuration,
        ...translatorConfiguration,
      })
    )

  const setLanguage = (language: string) => configure({ language })

  const translate = (key: string, substitutions?: any) => {
    let translation = dotobject(activeTranslation, key)
    if (typeof translation !== 'string') {
      console.warn(`The translation key "${key}" was not found!`)
      return key
    }

    return translation?.replace(
      /{{[^{}]+}}/g,
      (substitution: string) => substitutions[substitution.slice(2, -2)]
    ) as string
  }

  return (
    <TranslationContext.Provider value={{ configure, setLanguage, translate, configuration }}>
      {children}
    </TranslationContext.Provider>
  )
}

const useTranslate = () => {
  const { translate } = useContext(TranslationContext) || {}
  if (!translate) throw new Error('useTranslate must be used within TranslationProvider.')
  return translate as TranslateFunction
}

const useTranslatorConfigurer = () => {
  const { configure } = useContext(TranslationContext) || {}
  if (!configure) throw new Error('useTranslatorConfigurer must be used within TranslationProvider.')
  return configure as ConfigureFunction
}

const useTranslatorConfiguration = () => {
  const { configuration } = useContext(TranslationContext) || {}
  if (!configuration) throw new Error('useTranslatorConfigurer must be used within TranslationProvider.')
  return configuration as { language: string; defaultLanguage?: string }
}

export { useTranslate, useTranslatorConfigurer, useTranslatorConfiguration, TranslationProvider }
