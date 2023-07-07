import { Chain, Connector, normalizeChainId, Address, UserRejectedRequestError } from '@wagmi/core'
import { Signer, ethers } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { oAuthWallet } from '../lib/oAuthWallet'
import { ConnectorData } from 'wagmi'

const IS_SERVER = typeof window === 'undefined'

export class oAuthConnector extends Connector {
  ready = !IS_SERVER
  readonly id = 'oauth'
  readonly name = 'OAuth'

  private chainId: number | undefined
  private provider: ethers.providers.BaseProvider | undefined
  private wallet: ethers.Wallet | undefined
  private connecting: boolean = false
  private oAuthServiceUrl: string = ''

  constructor(config: { chains: Chain[]; options: any }) {
    super(config)
    this.chainId = config.chains[0].id

    if (!config.options.oAuthServiceUrl) throw new Error('oAuthServiceUrl is required')
    this.oAuthServiceUrl = config.options.oAuthServiceUrl
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
      this.provider = ethers.getDefaultProvider()
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
    oAuthWallet.deleteWallet()
  }

  protected onDisconnect(): void {
    this.emit('disconnect')
  }

  async isAuthorized() {
    let wallet = await oAuthWallet.getWallet()
    if (!wallet) return false

    wallet.connect(await this.getProvider())
    this.wallet = wallet

    return true
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

  private async createWallet() {
    let wallet = await oAuthWallet.getWallet()
    if (!wallet) {
      const w = new oAuthWallet(this.oAuthServiceUrl)
      wallet = await w.create()
    }

    wallet.connect(await this.getProvider())
    this.wallet = wallet
  }
}
