import { WindowProvider } from '@wagmi/connectors'
import { inputsWallet } from '../lib/inputsWallet'
import { localStorageConnector } from './localStorageConnector'

const IS_SERVER = typeof window === 'undefined'

export class inputsConnector extends localStorageConnector {
  ready = !IS_SERVER
  readonly id = 'inputs'
  readonly name = 'Inputs'

  protected async createWallet() {
    const provider = (await this.getProvider()) as WindowProvider
    let wallet = await inputsWallet.getWallet(provider)
    if (!wallet) {
      const w = new inputsWallet()
      wallet = await w.create(provider)
    }

    this.wallet = wallet
  }
}
