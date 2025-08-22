import { PublicClient, WalletClient } from 'viem'
import localStorageWallet from './localStorageWallet'

export type saasOauthParameters = {
  userSeed: string
  userEmail: string
  userName: string
  oauthSignedEmail: string
  wallet: WalletClient
}

/**
 * This class is used to create a wallet from an external service (OAuth)
 * that will return a seed from a popup message
 */

export class saasOAuthWallet extends localStorageWallet {
  private oAuthServiceUrl: string
  private oAuthServiceProvider: string
  private seed: any
  private cancel: boolean = false
  public email: string
  public signedEmail: string
  public userName: string

  constructor(oAuthServiceUrl: string, oAuthServiceProvider: string) {
    super()
    this.oAuthServiceUrl = oAuthServiceUrl
    this.oAuthServiceProvider = oAuthServiceProvider
  }

  async create(provider: PublicClient): Promise<saasOauthParameters> {
    // Open the login popup
    const url = this.oAuthServiceUrl + (this.oAuthServiceProvider ? `?provider=${this.oAuthServiceProvider}` : '')
    this.openLoginPopup(url)

    // Create the event listener to receive the seed from the popup
    window.addEventListener('message', this.handlePopupMessage.bind(this))

    // Check every 100ms if the message with the seed from the popup has been posted
    const r = await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.seed) {
          clearInterval(interval)
          resolve(this.seed)
        }

        if (this.cancel) {
          clearInterval(interval)
          resolve(null)
        }
      }, 100)
    })

    if (r === null) {
      throw new Error('User cancelled')
    }

    const wallet = await localStorageWallet.createWalletFromData(JSON.stringify(this.seed), provider)

    return {
      userSeed: this.seed,
      userEmail: this.email,
      userName: this.userName,
      oauthSignedEmail: this.signedEmail,
      wallet,
    }
  }

  private async openLoginPopup(url: string) {
    const width = 600
    const height = 600
    const left = window.outerWidth / 2 - width / 2
    const top = window.outerHeight / 2 - height / 2
    const params = [
      `width=${width}`,
      `height=${height}`,
      `top=${top}`,
      `left=${left}`,
      `status=no`,
      `resizable=yes`,
      `scrollbars=yes`,
    ].join(',')

    window.open(url, 'oauth', params)
  }

  private async handlePopupMessage(event: MessageEvent) {
    if (event.data.seed) {
      this.seed = event.data.seed
      if (event.data.email) {
        this.email = event.data.email
      }
      if (event.data.signedEmail) {
        this.signedEmail = event.data.signedEmail
      }
      if (event.data.userName) {
        this.userName = event.data.userName
      }
      window.removeEventListener('message', this.handlePopupMessage)
    }

    if (event.data.error) {
      window.removeEventListener('message', this.handlePopupMessage)
      throw new Error(event.data.error)
    }
  }
}
