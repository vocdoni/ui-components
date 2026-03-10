import { ClientProvider as RPClientProvider, type ClientProviderComponentProps } from './providers/client'
import { ConfirmProvider } from './confirm/ConfirmProvider'

export { useClient } from './providers/client'
export type { ClientEnv, ClientProviderComponentProps, ClientState } from './providers/client'

export const ClientProvider = ({ children, ...props }: ClientProviderComponentProps) => {
  return (
    <RPClientProvider {...props}>
      <ConfirmProvider>{children}</ConfirmProvider>
    </RPClientProvider>
  )
}
