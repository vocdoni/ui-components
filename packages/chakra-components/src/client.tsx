import { ToastProvider } from '@chakra-ui/react'
import { ComponentsProvider, ClientProvider as RPClientProvider } from '@vocdoni/react-providers'
import merge from 'ts-deepmerge'
import { ConfirmProvider } from './components'
import { defaultComponents } from './components/defaultComponents'
import { locales } from './i18n/locales'
import { ChakraClientProviderProps } from './types'

export const ClientProvider = ({ children, components: customComponents, ...props }: ChakraClientProviderProps) => {
  const loc = {
    locale: merge(locales, props.locale || {}),
  }

  // Merge components safely
  const mergedComponents = customComponents
    ? {
        Election: {
          ...defaultComponents.Election,
          ...customComponents.Election,
        },
        Organization: {
          ...defaultComponents.Organization,
          ...customComponents.Organization,
        },
        Account: {
          ...defaultComponents.Account,
          ...customComponents.Account,
        },
        Pagination: {
          ...defaultComponents.Pagination,
          ...customComponents.Pagination,
        },
      }
    : defaultComponents

  return (
    <>
      <ToastProvider />
      <RPClientProvider {...props} {...loc}>
        <ComponentsProvider components={mergedComponents}>
          <ConfirmProvider>{children}</ConfirmProvider>
        </ComponentsProvider>
      </RPClientProvider>
    </>
  )
}
