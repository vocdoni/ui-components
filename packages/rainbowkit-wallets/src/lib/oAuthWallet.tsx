import { ethers } from 'ethers'
import localStorageWallet from './localStorageWallet'

/**
 * This class is used to create a wallet from an external service (OAuth)
 * that will return a seed from a popup message
 */
export class oAuthWallet extends localStorageWallet {
  private oAuthServiceUrl: string
  private oAuthServiceProvider: string
  private data: any
  private cancel: boolean = false

  constructor(oAuthServiceUrl: string, oAuthServiceProvider: string) {
    super()
    this.oAuthServiceUrl = oAuthServiceUrl
    this.oAuthServiceProvider = oAuthServiceProvider
  }

  async create(): Promise<ethers.Wallet> {
    // Open the login popup
    const url = this.oAuthServiceUrl + (this.oAuthServiceProvider ? `?provider=${this.oAuthServiceProvider}` : '')
    this.openLoginPopup(url)

    // Create the event listener to receive the seed from the popup
    window.addEventListener('message', this.handlePopupMessage.bind(this))

    // Check every 100ms if the message with the seed from the popup has been posted
    const r = await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.data) {
          clearInterval(interval)
          resolve(this.data)
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

    return await localStorageWallet.createWallet(JSON.stringify(this.data))
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
      this.data = event.data.seed
      window.removeEventListener('message', this.handlePopupMessage)
    }
  }
}
