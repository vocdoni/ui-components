import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { oAuthWallet } from '../lib/oAuthWallet'
import { localStorageConnector } from './localStorageConnector'

export type oAuthConnectorOptions = {
  oAuthServiceUrl: string
  oAuthServiceProvider?: string
}

/**
 * Creates an OAuth connector for social login-based wallets
 */
export function oAuthConnector(options: oAuthConnectorOptions) {
  if (!options.oAuthServiceUrl) throw new Error('oAuthServiceUrl is required')

  return localStorageConnector({
    async createWallet() {
      const provider = createPublicClient({
        chain: mainnet,
        transport: http(),
      })

      let wallet = await oAuthWallet.getWallet(provider)

      if (!wallet) {
        const w = new oAuthWallet(options.oAuthServiceUrl, options.oAuthServiceProvider || '')
        wallet = await w.create(provider)
      }
    },
  })
}
