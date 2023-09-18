import { Address, Chain, Connector, UserRejectedRequestError, normalizeChainId } from '@wagmi/core'
import { Signer, Wallet, ethers, getDefaultProvider } from 'ethers'
import { getAddress } from 'ethers/lib/utils.js'
import { ConnectorData } from 'wagmi'
import localStorageWallet from '../lib/localStorageWallet'

const IS_SERVER = typeof window === 'undefined'

/**
 * A connector that uses the local storage to store seed for a deterministic wallet generation
 */
export class localStorageConnector extends Connector {
  ready = !IS_SERVER
  readonly id: string = 'localStorageConnector'
  readonly name: string = 'localStorage'

  protected chainId: number | undefined
  protected provider: ethers.providers.BaseProvider | undefined
  protected wallet: Wallet | undefined
  protected connecting: boolean = false

  constructor(config: { chains: Chain[]; options: any }) {
    super(config)
    this.chainId = config.chains[0].id
  }

  // @ts-ignore-next-line
  async connect() {
    this.emit('message', { type: 'connecting' })
    try {
      if (!this.wallet && !this.connecting) {
        this.connecting = true
        await this.createWallet()
      } else if (this.connecting) return

      this.connecting = false

      const account = await this.getAccount()
      const provider = await this.getProvider()
      const chainId = await this.getChainId()

      const cdata: ConnectorData = {
        account,
        chain: {
          id: chainId,
          unsupported: false,
        },
        provider: provider as any,
      }

      return cdata
    } catch (error) {
      this.connecting = false
      throw new UserRejectedRequestError(error)
    }
  }

  async getAccount(): Promise<Address> {
    const signer = await this.getSigner()
    if (!signer) throw new Error('No signer available')

    const account = await signer.getAddress()
    if (account.startsWith('0x')) return account as Address
    return `0x${account}`
  }

  async getProvider() {
    if (!this.provider) {
      //TODO: not sure this should be the default provider
      this.provider = getDefaultProvider()
    }
    return this.provider
  }

  async getSigner(): Promise<Signer | undefined> {
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
    let wallet = await localStorageWallet.getWallet()
    if (!wallet) return false

    wallet.connect(await this.getProvider())
    this.wallet = wallet

    return true
  }

  protected onDisconnect(): void {
    this.emit('disconnect')
  }

  protected onAccountsChanged(accounts: string[]): void {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0]) })
  }

  protected onChainChanged(chainId: string | number): void {
    const id = normalizeChainId(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected async createWallet() {}
}
