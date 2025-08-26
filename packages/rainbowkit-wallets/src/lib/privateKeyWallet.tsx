import { createRoot } from 'react-dom/client'
import { WalletClient } from 'viem'
import { ImportPrivateKeyModal } from '../components/ImportPrivateKeyModal'
import localStorageWallet from './localStorageWallet'

/**
 * This class is used to create a wallet from a form
 */
export class privateKeyWallet extends localStorageWallet {
  private data: any
  private cancel: boolean = false

  async create(provider: any): Promise<WalletClient> {
    // Create a div to render the modal
    const myDiv = document.createElement('div')
    myDiv.setAttribute('id', 'myDiv' + Math.random())
    document.getElementsByTagName('body')[0].appendChild(myDiv)
    const root = createRoot(myDiv)
    root.render(<ImportPrivateKeyModal onExit={() => (this.cancel = true)} onSubmit={(data) => (this.data = data)} />)

    // Check every 100ms if the user has submitted the form
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

    return await localStorageWallet.createWalletFromPrivateKey(this.data, provider)
  }
}
