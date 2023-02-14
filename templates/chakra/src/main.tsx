import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ClientProvider } from '@vocdoni/react-components'
import { EnvOptions } from '@vocdoni/sdk'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import reportWebVitals from './reportWebVitals'
import router from './router'
import * as serviceWorker from './serviceWorker'
import theme from './theme'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

// wagmi + rainbowkit wallets config
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'Vocdoni Voting Protocol',
  chains,
})

const client = createClient({
  provider,
  connectors,
  webSocketProvider,
})
// end wallets config

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <ClientProvider env={EnvOptions.DEV}>
            <RouterProvider router={router} />
            <ColorModeScript />
          </ClientProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
