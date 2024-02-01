import { Buffer } from 'buffer'
import { createWalletClient, custom, keccak256, publicActions } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { PublicClient, mainnet, WalletClient } from 'wagmi'

export default class localStorageWallet {
  static storageItemName = 'localstorage-wallet-seed'

  public static async getWallet(provider: PublicClient): Promise<WalletClient | false> {
    try {
      const value = localStorage.getItem(this.storageItemName) as `0x${string}`
      if (!value) return false

      return await this.createWallet(value, provider)
    } catch (err) {
      this.deleteWallet()
      console.error('failed to generate wallet:', err)
    }

    throw new Error('could not find or create wallet')
  }

  public static async createWalletFromPrivateKey(pk: string, provider: PublicClient): Promise<WalletClient> {
    if (!pk.startsWith('0x')) {
      pk = '0x' + pk
    }

    if (!this.isValidEthereumPrivateKey(pk)) throw new Error('invalid private key')

    localStorage.setItem(this.storageItemName, pk)
    return this.createWallet(pk as `0x${string}`, provider)
  }

  public static async createWalletFromData(data: string | string[], provider: PublicClient): Promise<WalletClient> {
    const inputs = Array.isArray(data) ? data : [data]
    const hash = inputs.reduce((acc, curr) => acc + curr, '')
    const pk = keccak256(Buffer.from(hash))
    localStorage.setItem(this.storageItemName, pk)
    return this.createWallet(pk, provider)
  }

  public static async createWallet(pk: `0x${string}`, provider: PublicClient): Promise<WalletClient> {
    const account = privateKeyToAccount(pk)
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

  public static isValidEthereumPrivateKey(privateKey: string): boolean {
    const hexRegex = /^[0-9a-fA-F]+$/

    // Remove the '0x' prefix if present
    if (privateKey.startsWith('0x')) {
      privateKey = privateKey.slice(2)
    }

    // Check if the private key is 64 characters long and only contains hexadecimal characters
    return privateKey.length === 64 && hexRegex.test(privateKey)
  }
}
