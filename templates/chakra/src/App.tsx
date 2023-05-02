import { ColorModeScript } from '@chakra-ui/react'
import { VocdoniEnvironment } from '@constants'
import { ClientProvider } from '@vocdoni/chakra-components'
import { EnvOptions } from '@vocdoni/sdk'
import { useSigner } from 'wagmi'
import { RoutesProvider } from './router'

export const App = () => {
  const { data: signer } = useSigner()

  return (
    <ClientProvider env={VocdoniEnvironment as EnvOptions} signer={signer}>
      <RoutesProvider />
      <ColorModeScript />
    </ClientProvider>
  )
}
