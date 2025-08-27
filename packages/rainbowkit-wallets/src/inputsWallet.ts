import { Wallet } from '@rainbow-me/rainbowkit'
import { inputsConnector } from './wagmi/inputsConnector'

export const inputsWallet = ({ name }: { name?: string } = {}): Wallet => ({
  id: 'inputs',
  name: name || 'Inputs',
  iconUrl: 'https://svgshare.com/i/upy.svg',
  iconBackground: '#fff',
  createConnector: inputsConnector,
})
