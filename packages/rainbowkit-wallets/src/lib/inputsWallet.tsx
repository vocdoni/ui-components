import { createRoot } from 'react-dom/client'
import { CreateWalletModal } from '../components/CreateWalletModal'
import localStorageWallet from './localStorageWallet'
import { PublicClient, WalletClient } from 'wagmi'

/**
 * This class is used to create a wallet from a form
 */
export class inputsWallet extends localStorageWallet {
  private data: any
  private cancel: boolean = false

  async create(provider: PublicClient): Promise<WalletClient> {
    // Create a div to render the modal
    const myDiv = document.createElement('div')
    myDiv.setAttribute('id', 'myDiv' + Math.random())
    document.getElementsByTagName('body')[0].appendChild(myDiv)
    const root = createRoot(myDiv)
    root.render(<CreateWalletModal onExit={() => (this.cancel = true)} onSubmit={(data) => (this.data = data)} />)

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

    return await localStorageWallet.createWallet(JSON.stringify(this.data), provider)
  }
}
