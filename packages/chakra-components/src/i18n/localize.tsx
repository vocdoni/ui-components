import type { Locale as DLocale } from 'date-fns'
import dotobject from 'dotobject'
import { createContext, PropsWithChildren, useContext } from 'react'
import { Locale } from './locales'

type LocalizeFunction = (key: string, substitutions?: any) => string
export type LocaleProviderProps = {
  locale: Locale
  datesLocale?: DLocale
}

const LocaleContext = createContext(
  {} as {
    localize: LocalizeFunction
    datesLocale?: DLocale
  }
)

const LocaleProvider = ({ locale, datesLocale, children }: PropsWithChildren<LocaleProviderProps>) => {
  const activeTranslation = locale

  const localize = (key: string, substitutions?: any) => {
    const translation = dotobject(activeTranslation, key)
    if (typeof translation !== 'string') {
      console.warn(`The locale key "${key}" was not found!`)
      return key
    }

    return translation?.replace(/{{\s*([^{}\s]+)\s*}}/g, (_, varname) => dotobject(substitutions, varname)) as string
  }

  return <LocaleContext.Provider value={{ localize, datesLocale }}>{children}</LocaleContext.Provider>
}

const useLocalize = () => {
  const { localize } = useContext(LocaleContext) || {}
  if (!localize) throw new Error('useLocalize must be used within LocaleProvider.')
  return localize
}

const useDatesLocale = () => {
  const { datesLocale } = useContext(LocaleContext)
  return datesLocale
}

export { LocaleProvider, useDatesLocale, useLocalize }
