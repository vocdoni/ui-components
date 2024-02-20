import { Wallet } from '@rainbow-me/rainbowkit'
import { Chain } from 'wagmi'
import { privateKeyConnector } from './wagmi/privateKeyConnector'

export const privateKeyWallet = ({
  id,
  chains,
  name,
  iconUrl,
}: {
  id: string
  chains: Chain[]
  name: string
  iconUrl: string
}) =>
  ({
    id: id || 'Private Key',
    name: name || 'Private Key',
    iconUrl: iconUrl || 'https://i.ibb.co/CBw87jR/private-key.png',
    iconBackground: '#fff',
    createConnector: () => {
      const connector = new privateKeyConnector({
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
