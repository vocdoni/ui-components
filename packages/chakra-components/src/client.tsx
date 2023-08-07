import { ToastProvider } from '@chakra-ui/toast'
import { ClientProviderComponentProps, ClientProvider as RPClientProvider } from '@vocdoni/react-providers'
import merge from 'ts-deepmerge'
import { locales } from './i18n/locales'

export const ClientProvider = (props: ClientProviderComponentProps) => {
  const loc = {
    locale: merge(locales, props.locale || {}),
  }
  return (
    <>
      <ToastProvider />
      <RPClientProvider {...props} {...loc} />
    </>
  )
}
