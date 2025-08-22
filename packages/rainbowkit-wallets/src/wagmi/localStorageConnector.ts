import { createPublicClient, http, UserRejectedRequestError, type Address } from 'viem'
import { mainnet } from 'viem/chains'
import { createConnector } from 'wagmi'
import localStorageWallet from '../lib/localStorageWallet'

export interface LocalStorageConnectorParameters {
  createWallet?: () => Promise<void>
}

/**
 * A connector that uses the local storage to store seed for a deterministic wallet generation
 */
export function localStorageConnector(parameters: LocalStorageConnectorParameters = {}) {
  return createConnector((config) => {
    let currentWallet: any = null

    return {
      id: 'localStorageConnector',
      name: 'localStorage',
      type: 'localStorageConnector',

      async connect() {
        try {
          const provider = createPublicClient({
            chain: mainnet,
            transport: http(),
          })

          // @ts-ignore - Viem v2 type issue with client extension
          let wallet = await localStorageWallet.getWallet(provider)

          if (!wallet && parameters.createWallet) {
            await parameters.createWallet()
            // @ts-ignore - Viem v2 type issue with client extension
            wallet = await localStorageWallet.getWallet(provider)
          }

          if (!wallet) {
            throw new Error('No wallet available')
          }

          const account = wallet.account?.address
          if (!account) throw new Error('No account available')

          currentWallet = wallet

          return {
            accounts: [account as Address],
            chainId: mainnet.id,
          }
        } catch (error) {
          throw new UserRejectedRequestError(error as Error)
        }
      },

      async disconnect() {
        await localStorageWallet.deleteWallet()
        currentWallet = null
      },

      async getAccounts() {
        try {
          const provider = createPublicClient({
            chain: mainnet,
            transport: http(),
          })
          // @ts-ignore - Viem v2 type issue with client extension
          const wallet = await localStorageWallet.getWallet(provider)
          if (!wallet) return []
          return wallet.account?.address ? [wallet.account.address as Address] : []
        } catch {
          return []
        }
      },

      async getChainId() {
        return mainnet.id
      },

      async getProvider() {
        return createPublicClient({
          chain: mainnet,
          transport: http(),
        })
      },

      async getWalletClient() {
        if (!currentWallet) {
          const provider = createPublicClient({
            chain: mainnet,
            transport: http(),
          })
          // @ts-ignore - Viem v2 type issue with client extension
          currentWallet = await localStorageWallet.getWallet(provider)
        }
        return currentWallet
      },

      async isAuthorized() {
        try {
          const provider = createPublicClient({
            chain: mainnet,
            transport: http(),
          })
          // @ts-ignore - Viem v2 type issue with client extension
          const wallet = await localStorageWallet.getWallet(provider)
          return !!wallet
        } catch {
          return false
        }
      },

      async switchChain({ chainId }: { chainId: number }) {
        throw new Error('Switching chains is not supported by this connector')
      },

      onAccountsChanged() {},
      onChainChanged() {},
      onConnect() {},
      onDisconnect() {},
      onMessage() {},
    }
  })
}
