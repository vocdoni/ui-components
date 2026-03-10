import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import i18n from 'i18next'
import { createElement, ReactNode, useRef } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { reactComponentsDefaultLanguage, reactComponentsNamespace, reactComponentsResources } from '../i18n/locales'

// workaround for https://github.com/testing-library/react-testing-library/issues/1233#issuecomment-1686160909
export const onlyProps = (props: any) => {
  const {
    children: {
      props: { renderCallbackProps },
    },
  } = props

  return {
    ...renderCallbackProps,
  }
}

export const properProps = (props: any) => ({
  ...onlyProps(props),
  children: props.children,
})

export const CensusUrls = {
  dev: 'https://census3-dev.vocdoni.net/api',
  stg: 'https://census3-stg.vocdoni.net/api',
  prod: 'https://census3.vocdoni.io/api',
}
export const ApiUrl = {
  dev: 'https://api-dev.vocdoni.net/v2',
  stg: 'https://api-stg.vocdoni.net/v2',
  prod: 'https://api.vocdoni.io/v2',
}

export const createI18nWrapper = () => {
  const instance = i18n.createInstance()
  instance.use(initReactI18next).init({
    lng: reactComponentsDefaultLanguage,
    resources: reactComponentsResources,
    ns: [reactComponentsNamespace],
    defaultNS: reactComponentsNamespace,
    showSupportNotice: false,
  })

  return ({ children }: { children: ReactNode }) => createElement(I18nextProvider, { i18n: instance }, children)
}

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

export const TestProvider = ({ children, queryClient }: { children: ReactNode; queryClient?: QueryClient }) => {
  const clientRef = useRef<QueryClient | null>(null)
  const i18nWrapperRef = useRef<ReturnType<typeof createI18nWrapper> | null>(null)
  if (!clientRef.current) {
    clientRef.current = createTestQueryClient()
  }
  if (!i18nWrapperRef.current) {
    i18nWrapperRef.current = createI18nWrapper()
  }

  const client = queryClient ?? clientRef.current
  const I18nWrapper = i18nWrapperRef.current

  return createElement(QueryClientProvider, { client }, createElement(I18nWrapper, null, children))
}

export const createQueryWrapper = () => {
  const queryClient = createTestQueryClient()
  const I18nWrapper = createI18nWrapper()

  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, createElement(I18nWrapper, null, children))
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    lng: reactComponentsDefaultLanguage,
    resources: reactComponentsResources,
    ns: [reactComponentsNamespace],
    defaultNS: reactComponentsNamespace,
    showSupportNotice: false,
  })
}
