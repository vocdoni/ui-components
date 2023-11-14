import { normalizeChainId, WindowProvider } from '@wagmi/connectors'
import { InjectedConnector } from '@wagmi/connectors/injected'
import { Account, Chain, getAddress, UserRejectedRequestError, type Address } from 'viem'
import { ConnectorData, ConnectorNotFoundError } from 'wagmi'
import localStorageWallet from '../lib/localStorageWallet'

const IS_SERVER = typeof window === 'undefined'

/**
 * A connector that uses the local storage to store seed for a deterministic wallet generation
 */
export class localStorageConnector extends InjectedConnector {
  ready = !IS_SERVER
  readonly id: string = 'localStorageConnector'
  readonly name: string = 'localStorage'

  protected chainId: number | undefined
  protected provider: WindowProvider | undefined
  protected wallet: Account | undefined

  constructor(config: { chains: Chain[]; options: any }) {
    super(config)
    this.chainId = config.chains[0].id
  }

  // @ts-ignore-next-line
  async connect() {
    this.emit('message', { type: 'connecting' })
    try {
      if (!this.wallet) {
        await this.createWallet()
      }

      const account = await this.getAccount()
      const chainId = await this.getChainId()

      const cdata: ConnectorData = {
        account,
        chain: {
          id: chainId,
          unsupported: false,
        },
      }

      return cdata
    } catch (error) {
      throw new UserRejectedRequestError(error as Error)
    }
  }

  async getAccount(): Promise<Address> {
    const signer = await this.getSigner()
    if (!signer) throw new Error('No signer available')

    const account = signer.address
    if (account.startsWith('0x')) return account as Address
    return `0x${account}`
  }

  async getSigner(): Promise<Account | undefined> {
    return this.wallet
  }

  async getChainId() {
    return this.chainId as number
  }

  async disconnect(): Promise<void> {
    this.wallet = undefined
    localStorageWallet.deleteWallet()
  }

  async isAuthorized() {
    const provider = await this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()

    let wallet = await localStorageWallet.getWallet(provider)
    if (!wallet) return false

    this.wallet = wallet.account

    const account = await this.getAccount()
    return !!account
  }

  onDisconnect = async (error: Error): Promise<void> => {
    this.emit('disconnect')
    return Promise.resolve()
  }

  onAccountsChanged = (accounts: string[]): void => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0]) })
  }

  onChainChanged = (chainId: string | number): void => {
    const id = normalizeChainId(chainId)

    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected async createWallet() {}
}
