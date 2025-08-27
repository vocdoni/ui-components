import { Wallet } from '@rainbow-me/rainbowkit'
import { oAuthConnector, oAuthConnectorOptions } from './wagmi/oAuthConnector'

export const oAuthWallet = ({
  id,
  name,
  iconUrl,
  options,
}: {
  id?: string
  name?: string
  iconUrl?: string
  options: oAuthConnectorOptions
}): Wallet => ({
  id: id || 'oAuth',
  name: name || 'OAuth',
  iconUrl: iconUrl || 'https://i.ibb.co/Mh7LXsn/social-login-COLOR-2.png',
  iconBackground: '#fff',
  createConnector: () => oAuthConnector(options),
})
