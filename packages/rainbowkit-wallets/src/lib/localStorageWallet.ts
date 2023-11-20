import { Buffer } from 'buffer'
import { createWalletClient, custom, keccak256, WalletClient, publicActions } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { PublicClient, mainnet } from 'wagmi'

export default class localStorageWallet {
  static storageItemName = 'localstorage-wallet-seed'

  public static async getWallet(provider: PublicClient): Promise<WalletClient | undefined> {
    try {
      const value: string = localStorage.getItem(this.storageItemName) as string
      if (!value) return undefined

      return this.createWallet(value, provider)
    } catch (err) {
      console.error('failed to generate wallet:', err)
    }

    return undefined
  }

  public static async createWallet(data: string | string[], provider: PublicClient): Promise<WalletClient> {
    const inputs = Array.isArray(data) ? data : [data]
    const hash = inputs.reduce((acc, curr) => acc + curr, '')

    localStorage.setItem(this.storageItemName, hash)

    const account = privateKeyToAccount(keccak256(Buffer.from(hash)))
    const client = createWalletClient({
      account,
      chain: mainnet,
      transport: custom({
        async request({ method, params }) {
          switch (method) {
            case 'eth_accounts':
              return [account.address]
            case 'net_version':
            case 'eth_chainId':
              return `0x${mainnet.id}`
            case 'personal_sign': {
              const [message, address] = params
              return (await account.signMessage({ message })) || '0x'
            }
            case 'eth_sign': {
              const [address, messageHash] = params
              return (await account.signMessage({ message: messageHash })) || '0x'
            }
            case 'eth_signTypedData':
            case 'eth_signTypedData_v4': {
              const [address, typedData] = params
              const parsedTypedData = typeof typedData === 'string' ? JSON.parse(typedData) : typedData

              const signature = await account.signTypedData(parsedTypedData)
              return signature || '0x'
            }
            default:
              provider.request({ method, params })
          }
        },
      }),
    }).extend(publicActions)

    return client
  }

  public static async deleteWallet(): Promise<void> {
    localStorage.removeItem(this.storageItemName)
  }
}
