import { Wallet } from '@rainbow-me/rainbowkit'
import { saasOAuthConnector, saasOauthConnectorOptions } from './wagmi/saasOauthConnector'

export const saasOAuthWallet = ({
  id,
  name,
  iconUrl,
  options,
}: {
  id?: string
  name?: string
  iconUrl?: string
  options: saasOauthConnectorOptions
}): Wallet => ({
  id: id || 'saasOAuth',
  name: name || 'SaaS OAuth',
  iconUrl: iconUrl || 'https://i.ibb.co/Mh7LXsn/social-login-COLOR-2.png',
  iconBackground: '#fff',
  createConnector: () =>
    saasOAuthConnector({
      ...options,
      id: id || 'saasOAuth',
      name: name || 'SaaS OAuth',
    }),
})
