import { ToastProvider } from '@chakra-ui/toast'
import { ClientProviderComponentProps, ClientProvider as RPClientProvider } from '@vocdoni/react-providers'
import merge from 'ts-deepmerge'
import { locales } from './i18n/locales'
import ConfirmProvider from './utils/ConfirmProvider'

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
