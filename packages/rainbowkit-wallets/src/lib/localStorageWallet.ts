import { Wallet } from 'ethers'
import { keccak256 } from 'ethers/lib/utils.js'

export default class localStorageWallet {
  static storageItemName = 'localstorage-wallet-seed'

  public static async getWallet(): Promise<Wallet | undefined> {
    try {
      const value: string = localStorage.getItem(this.storageItemName) as string
      if (!value) return undefined

      return this.createWallet(value)
    } catch (err) {
      console.log(err)
    }

    return undefined
  }

  public static async createWallet(data: string | string[]): Promise<Wallet> {
    const inputs = Array.isArray(data) ? data : [data]
    const hash = inputs.reduce((acc, curr) => acc + curr, '')

    localStorage.setItem(this.storageItemName, hash)

    return new Wallet(keccak256(Buffer.from(hash)))
  }

  public static async deleteWallet(): Promise<void> {
    localStorage.removeItem(this.storageItemName)
  }
}
