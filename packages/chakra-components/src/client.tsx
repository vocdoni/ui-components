import { ToastProvider } from '@chakra-ui/react'
import {
  ComponentsProvider,
  ClientProvider as RPClientProvider,
  VocdoniComponentDefinition,
} from '@vocdoni/react-providers'
import merge from 'ts-deepmerge'
import { ConfirmProvider } from './components'
import { defaultComponents } from './components/defaultComponents'
import { locales } from './i18n/locales'
import { ChakraClientProviderProps } from './types'

export const ClientProvider = ({ children, components: customComponents, ...props }: ChakraClientProviderProps) => {
  const loc = {
    locale: merge(locales, props.locale || {}),
  }

  const mergedComponents = customComponents ? merge(defaultComponents, customComponents) : defaultComponents

  return (
    <>
      <ToastProvider />
      <RPClientProvider {...props} {...loc}>
        <ComponentsProvider components={mergedComponents as VocdoniComponentDefinition}>
          <ConfirmProvider>{children}</ConfirmProvider>
        </ComponentsProvider>
      </RPClientProvider>
    </>
  )
}
