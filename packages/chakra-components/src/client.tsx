import { ToastProvider } from '@chakra-ui/toast'
import { ClientProviderComponentProps, ClientProvider as RPClientProvider } from '@vocdoni/react-providers'
import merge from 'ts-deepmerge'
import { ConfirmProvider } from './components'
import { locales } from './i18n/locales'

export const ClientProvider = ({ children, ...props }: ClientProviderComponentProps) => {
  const loc = {
    locale: merge(locales, props.locale || {}),
  }
  return (
    <>
      <ToastProvider />
      <RPClientProvider {...props} {...loc}>
        <ConfirmProvider>{children}</ConfirmProvider>
      </RPClientProvider>
    </>
  )
}
