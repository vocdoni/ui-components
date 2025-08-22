import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { inputsWallet } from '../lib/inputsWallet'
import { localStorageConnector } from './localStorageConnector'

/**
 * Creates an inputs connector that prompts users for wallet creation data
 */
export function inputsConnector() {
  return localStorageConnector({
    async createWallet() {
      const provider = createPublicClient({
        chain: mainnet,
        transport: http(),
      })

      // @ts-ignore - Viem v2 type issue with client extension
      let wallet = await inputsWallet.getWallet(provider)
      if (!wallet) {
        const w = new inputsWallet()
        // @ts-ignore - Viem v2 type issue with client extension
        wallet = await w.create(provider)
      }
    },
  })
}
