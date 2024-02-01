import { privateKeyWallet } from '../lib/privateKeyWallet'
import { localStorageConnector } from './localStorageConnector'
import { PublicClient, WalletClient } from 'wagmi'

const IS_SERVER = typeof window === 'undefined'

export class privateKeyConnector extends localStorageConnector {
  ready = !IS_SERVER
  readonly id = 'privateKey'
  readonly name = 'Private Key'

  protected async createWallet() {
    const provider = (await this.getProvider()) as PublicClient
    let wallet = await privateKeyWallet.getWallet(provider)
    if (!wallet) {
      const w = new privateKeyWallet()
      wallet = await w.create(provider)
    }

    this.wallet = wallet as WalletClient
  }
}
