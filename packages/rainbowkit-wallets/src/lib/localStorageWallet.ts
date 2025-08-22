import { Buffer } from 'buffer'
import CryptoJS from 'crypto-js'
import { createWalletClient, custom, keccak256, PublicClient, WalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

export default class localStorageWallet {
  static storageItemName = 'localstorage-wallet-seed'
  static storageItemEncryptionItemName = 'session-wallet-encryption-key'

  public static async getWallet(provider: PublicClient): Promise<WalletClient | false> {
    try {
      const value: string = localStorage.getItem(this.storageItemName) as string
      if (!value) return false

      const valueObj = JSON.parse(value) as { type: string; pk: string }

      let pk = valueObj.pk
      if (valueObj.type === 'encrypted') {
        const password = sessionStorage.getItem(this.storageItemEncryptionItemName)
        if (!password) return false
        pk = CryptoJS.AES.decrypt(pk, password).toString(CryptoJS.enc.Utf8)
      }

      return await this.createWallet(pk as `0x${string}`, provider)
    } catch (err) {
      this.deleteWallet()
      console.error('failed to generate wallet:', err)
    }

    throw new Error('could not find or create wallet')
  }

  public static async createWalletFromPrivateKey(
    pkAndPassword: { pk?: string; password: string },
    provider: PublicClient
  ): Promise<WalletClient> {
    let pk = pkAndPassword.pk
    // not receiving a pk means it should be stored in local storage (and encrypted already)
    if (!pk) {
      const key = localStorage.getItem(this.storageItemName) as string
      try {
        const { pk: encrypted } = JSON.parse(key) as { type: string; pk: string }
        pk = CryptoJS.AES.decrypt(encrypted, pkAndPassword.password).toString(CryptoJS.enc.Utf8)
      } catch (e) {
        throw e
      }
    }

    if (!pk) {
      throw new Error('got no private key (or the password was invalid)')
    }

    if (!pk.startsWith('0x')) {
      pk = '0x' + pk
    }

    if (!this.isValidEthereumPrivateKey(pk)) throw new Error('invalid private key')

    const encryptedPk = CryptoJS.AES.encrypt(pk, pkAndPassword.password).toString()
    localStorage.setItem(this.storageItemName, JSON.stringify({ type: 'encrypted', pk: encryptedPk }))
    sessionStorage.setItem(this.storageItemEncryptionItemName, pkAndPassword.password)
    return this.createWallet(pk as `0x${string}`, provider)
  }

  public static async createWalletFromData(data: string | string[], provider: PublicClient): Promise<WalletClient> {
    const inputs = Array.isArray(data) ? data : [data]
    const hash = inputs.reduce((acc, curr) => acc + curr, '')
    const pk = keccak256(Buffer.from(hash))
    localStorage.setItem(this.storageItemName, JSON.stringify({ type: 'plain', pk }))
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
              const [message] = params
              return (await account.signMessage({ message })) || '0x'
            }
            case 'eth_sign': {
              const [, messageHash] = params
              return (await account.signMessage({ message: messageHash })) || '0x'
            }
            case 'eth_signTypedData':
            case 'eth_signTypedData_v4': {
              const [, typedData] = params
              const parsedTypedData = typeof typedData === 'string' ? JSON.parse(typedData) : typedData

              const signature = await account.signTypedData(parsedTypedData)
              return signature || '0x'
            }
            default:
              provider.request({ method, params })
          }
        },
      }),
    })

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

  public static isAwaitingPassword() {
    if (localStorage.getItem(this.storageItemName) && !sessionStorage.getItem(this.storageItemEncryptionItemName)) {
      return true
    }

    return false
  }
}
