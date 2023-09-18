import { oAuthConnector } from './wagmi/oAuthConnector'

export const oAuthWallet = ({ chains, name, iconUrl, options }: any) => ({
  id: 'oAuth',
  name: name || 'OAuth',
  iconUrl: iconUrl || 'https://i.ibb.co/Mh7LXsn/social-login-COLOR-2.png',
  iconBackground: '#fff',
  createConnector: () => {
    const connector = new oAuthConnector({
      chains: chains,
      options: options || {},
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
})
