import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { configureChains, createConfig } from 'wagmi'
import type { Chain } from 'wagmi/chains'
import { mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const vocdoni = {
  ...mainnet,
  // we need id zero to bypass the switch chain behavior
  id: 0,
  name: 'Vocdoni',
  network: 'none',
} as const satisfies Chain

export const { chains, publicClient } = configureChains([vocdoni], [publicProvider()])

export const { connectors } = getDefaultWallets({
  appName: "Vocdoni's Voting Protocol",
  projectId: 'VOCDONI_SCAFFOLD_UI',
  chains,
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})
