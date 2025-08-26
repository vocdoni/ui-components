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

      let wallet = await inputsWallet.getWallet(provider)
      if (!wallet) {
        const w = new inputsWallet()
        wallet = await w.create(provider)
      }
    },
  })
}
