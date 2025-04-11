import { Chain, PublicClient, WalletClient } from 'wagmi'
import { saasOAuthWallet } from '../lib/saasOauthWallet'
import { localStorageConnector } from './localStorageConnector'

const IS_SERVER = typeof window === 'undefined'

export type saasOauthConnectorOptions = {
  oAuthServiceUrl: string
  oAuthServiceProvider?: string
  saasBackendUrl?: string
}

export class saasOAuthConnector extends localStorageConnector {
  ready = !IS_SERVER
  readonly id = 'oauth'
  readonly name = 'OAuth'

  private oAuthServiceUrl: string = ''
  private oAuthServiceProvider: string = ''
  static storageTokenName = 'authToken'
  static storageExpiryName = 'authExpiry'

  constructor(config: { chains: Chain[]; options: saasOauthConnectorOptions }) {
    super(config)

    if (!config.options.oAuthServiceUrl) throw new Error('oAuthServiceUrl is required')
    this.oAuthServiceUrl = config.options.oAuthServiceUrl

    if (config.options.oAuthServiceProvider) this.oAuthServiceProvider = config.options.oAuthServiceProvider
  }

  protected async createWallet() {
    const provider = (await this.getProvider()) as PublicClient
    let wallet = await saasOAuthWallet.getWallet(provider)

    if (!wallet) {
      const w = new saasOAuthWallet(this.oAuthServiceUrl, this.oAuthServiceProvider)
      const params = await w.create(provider)
      const userOauthSignature = await params.wallet.signMessage({
        account: params.wallet.account,
        message: params.oauthSignedEmail,
      })

      let lastname = ''
      let nameData = params.userName.split(' ')
      const firstname = nameData[0]
      if (nameData.length > 1) {
        lastname = nameData[1]
      }

      const response = await fetch(this.options.saasBackendUrl + '/oauth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: params.userEmail,
          firstName: firstname,
          lastName: lastname,
          userOauthSignature: userOauthSignature,
          oauthSignature: params.oauthSignedEmail,
          address: params.wallet.account.address,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to send data to SaaS backend')
      }

      const data = await response.json()
      const { token, expiry, registered } = data
      localStorage.setItem(saasOAuthConnector.storageTokenName, token)
      localStorage.setItem(saasOAuthConnector.storageExpiryName, expiry)
      this.newAccount = registered

      wallet = params.wallet
    }

    this.wallet = wallet as WalletClient
  }
}
