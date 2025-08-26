import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { privateKeyWallet } from '../lib/privateKeyWallet'
import { localStorageConnector } from './localStorageConnector'

/**
 * Creates a private key connector that prompts users for private key input
 */
export function privateKeyConnector() {
  return localStorageConnector({
    async createWallet() {
      const provider = createPublicClient({
        chain: mainnet,
        transport: http(),
      })

      let wallet = await privateKeyWallet.getWallet(provider)
      if (!wallet) {
        const w = new privateKeyWallet()
        wallet = await w.create(provider)
      }
    },
  })
}
