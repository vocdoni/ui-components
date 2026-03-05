import { ClientProvider as RPClientProvider, ClientProviderComponentProps } from '@vocdoni/react-providers'
import { ConfirmProvider } from './confirm/ConfirmProvider'

export const ClientProvider = ({ children, ...props }: ClientProviderComponentProps) => {
  return (
    <RPClientProvider {...props}>
      <ConfirmProvider>{children}</ConfirmProvider>
    </RPClientProvider>
  )
}
