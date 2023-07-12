import { Chain } from '@wagmi/core'
import { oAuthWallet } from '../lib/oAuthWallet'
import { localStorageConnector } from './localStorageConnector'

const IS_SERVER = typeof window === 'undefined'

export class oAuthConnector extends localStorageConnector {
  ready = !IS_SERVER
  readonly id = 'oauth'
  readonly name = 'OAuth'

  private oAuthServiceUrl: string = ''

  constructor(config: { chains: Chain[]; options: any }) {
    super(config)

    if (!config.options.oAuthServiceUrl) throw new Error('oAuthServiceUrl is required')
    this.oAuthServiceUrl = config.options.oAuthServiceUrl
  }

  protected async createWallet() {
    let wallet = await oAuthWallet.getWallet()
    if (!wallet) {
      const w = new oAuthWallet(this.oAuthServiceUrl)
      wallet = await w.create()
    }

    wallet.connect(await this.getProvider())
    this.wallet = wallet
  }
}
