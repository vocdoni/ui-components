import { Wallet } from '@rainbow-me/rainbowkit'
import { Chain } from 'wagmi'
import { saasOAuthConnector, saasOauthConnectorOptions } from './wagmi/saasOauthConnector'

export const saasOAuthWallet = ({
  id,
  chains,
  name,
  iconUrl,
  options,
}: {
  id: string
  chains: Chain[]
  name: string
  iconUrl: string
  options: saasOauthConnectorOptions
}) =>
  ({
    id: id || 'oAuth',
    name: name || 'OAuth',
    iconUrl: iconUrl || 'https://i.ibb.co/Mh7LXsn/social-login-COLOR-2.png',
    iconBackground: '#fff',
    createConnector: () => {
      const connector = new saasOAuthConnector({
        chains: chains,
        options: options || {
          oAuthServiceUrl: 'https://oauth.vocdoni.io',
          saasBackendUrl: 'https://saas-api.vocdoni.net',
        },
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
