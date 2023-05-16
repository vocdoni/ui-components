import dotobject from 'dotobject'
import { createContext, ReactElement, useContext } from 'react'
import type { Translations } from './translations'

type TranslateFunction = (key: string, substitutions?: any) => string

const TranslationContext = createContext(
  {} as {
    translate: TranslateFunction
  }
)

const TranslationProvider = ({ translations, children }: { translations: Translations; children: ReactElement }) => {
  const validateConfiguration = ({ translations }: { translations?: Translations }) => {
    return { translations } as {
      translations: Translations
    }
  }

  const activeTranslation = translations

  const translate = (key: string, substitutions?: any) => {
    let translation = dotobject(activeTranslation, key)
    if (typeof translation !== 'string') {
      console.warn(`The translation key "${key}" was not found!`)
      return key
    }

    return translation?.replace(/{{\s*([^{}\s]+)\s*}}/g, (ign, varname) => dotobject(substitutions, varname)) as string
  }

  return <TranslationContext.Provider value={{ translate }}>{children}</TranslationContext.Provider>
}

const useTranslate = () => {
  const { translate } = useContext(TranslationContext) || {}
  if (!translate) throw new Error('useTranslate must be used within TranslationProvider.')
  return translate as TranslateFunction
}

export { useTranslate, TranslationProvider }
