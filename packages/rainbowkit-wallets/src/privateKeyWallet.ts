import { Wallet } from '@rainbow-me/rainbowkit'
import { privateKeyConnector } from './wagmi/privateKeyConnector'

export const privateKeyWallet = ({
  id,
  name,
  iconUrl,
}: {
  id?: string
  name?: string
  iconUrl?: string
} = {}): Wallet => ({
  id: id || 'privateKey',
  name: name || 'Private Key',
  iconUrl: iconUrl || 'https://i.ibb.co/CBw87jR/private-key.png',
  iconBackground: '#fff',
  createConnector: privateKeyConnector,
})
