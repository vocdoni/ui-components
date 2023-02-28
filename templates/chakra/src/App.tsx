import { ColorModeScript } from '@chakra-ui/react'
import { ClientProvider } from '@vocdoni/react-components'
import { RouterProvider } from 'react-router-dom'
import { useSigner } from 'wagmi'
import router from './router'

export const App = () => {
  const { data: signer } = useSigner()

  return (
    <ClientProvider env='dev' signer={signer}>
      <RouterProvider router={router} />
      <ColorModeScript />
    </ClientProvider>
  )
}
