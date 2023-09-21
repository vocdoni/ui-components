import { Wallet } from '@rainbow-me/rainbowkit'
import { Chain } from 'wagmi'
import { inputsConnector } from './wagmi/inputsConnector'

export const inputsWallet = ({ chains, name }: { chains: Chain[]; name: string }) =>
  ({
    id: 'inputs',
    name: name || 'Inputs',
    iconUrl: 'https://svgshare.com/i/upy.svg',
    iconBackground: '#fff',
    createConnector: () => {
      const connector = new inputsConnector({
        chains: chains,
        options: {},
      })
      return {
        connector,
        mobile: {
          getUri: async () => {
            try {
              await connector.connect()
              return window.location.href
            } catch (e) {
              console.error('Failed to connect')
            }
            return ''
          },
        },
        desktop: {
          getUri: async () => {
            try {
              await connector.connect()
            } catch (e) {
              console.error('Failed to connect')
            }
            return ''
          },
        },
      }
    },
  } as Wallet)
