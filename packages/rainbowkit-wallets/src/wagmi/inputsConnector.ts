import { inputsWallet } from '../lib/inputsWallet'
import { localStorageConnector } from './localStorageConnector'

const IS_SERVER = typeof window === 'undefined'

export class inputsConnector extends localStorageConnector {
  ready = !IS_SERVER
  readonly id = 'inputs'
  readonly name = 'Inputs'

  protected async createWallet() {
    let wallet = await inputsWallet.getWallet()
    if (!wallet) {
      const w = new inputsWallet()
      wallet = await w.create()
    }

    wallet.connect(await this.getProvider())
    this.wallet = wallet
  }
}
