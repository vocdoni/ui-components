import { ColorModeScript } from '@chakra-ui/react'
import { VocdoniEnvironment } from '@constants'
import { walletClientToSigner } from '@constants/wagmi-adapters'
import { ClientProvider } from '@vocdoni/chakra-components'
import { EnvOptions } from '@vocdoni/sdk'
import { Signer } from 'ethers'
import { useWalletClient } from 'wagmi'
import { RoutesProvider } from './router'

export const App = () => {
  const { data } = useWalletClient()

  let signer: Signer = {} as Signer
  if (data) {
    signer = walletClientToSigner(data)
  }

  return (
    <ClientProvider env={VocdoniEnvironment as EnvOptions} signer={signer}>
      <RoutesProvider />
      <ColorModeScript />
    </ClientProvider>
  )
}
