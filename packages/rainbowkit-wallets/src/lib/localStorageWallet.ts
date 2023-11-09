import { Buffer } from 'buffer'
import { keccak256, createWalletClient, custom, WalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'wagmi'
import { WindowProvider } from '@wagmi/connectors'

export default class localStorageWallet {
  static storageItemName = 'localstorage-wallet-seed'

  public static async getWallet(provider: WindowProvider): Promise<WalletClient | undefined> {
    try {
      const value: string = localStorage.getItem(this.storageItemName) as string
      if (!value) return undefined

      return this.createWallet(value, provider)
    } catch (err) {
      console.error('failed to generate wallet:', err)
    }

    return undefined
  }

  public static async createWallet(data: string | string[], provider: WindowProvider): Promise<WalletClient> {
    const inputs = Array.isArray(data) ? data : [data]
    const hash = inputs.reduce((acc, curr) => acc + curr, '')

    localStorage.setItem(this.storageItemName, hash)

    const account = privateKeyToAccount(keccak256(Buffer.from(hash)))
    const client = createWalletClient({
      account,
      chain: mainnet,
      transport: custom(provider),
    })

    return client
  }

  public static async deleteWallet(): Promise<void> {
    localStorage.removeItem(this.storageItemName)
  }
}
