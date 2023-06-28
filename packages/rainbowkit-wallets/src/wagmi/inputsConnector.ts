import { Signer, ethers } from 'ethers'
import { getAddress } from 'ethers/lib/utils.js'
import { Address, Chain, Connector, UserRejectedRequestError, normalizeChainId } from '@wagmi/core'

const IS_SERVER = typeof window === 'undefined'

export class inputsConnector extends Connector {
  ready = !IS_SERVER
  readonly id = 'nextauth'
  readonly name = 'NextAuth'

  private chainId: number | undefined
  private provider: ethers.providers.BaseProvider | undefined
  private wallet: ethers.Wallet | undefined

  constructor(config: { chains: Chain[]; options: any }) {
    super(config)
    this.chainId = config.chains[0].id
  }

  async connect() {
    try {
      alert('Show the modal and stuff')

      const account = await this.getAccount()
      const provider = await this.getProvider()
      const chainId = await this.getChainId()

      return {
        account,
        chain: {
          id: chainId,
          unsupported: false,
        },
        provider: provider as any,
      }
    } catch (error) {
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
    if (!this.wallet) {
      //   const wallet = VocdoniSDKClient.generateWalletFromData(await NextAuth.getWalletSeedFromSession())
      const wallet = ethers.Wallet.createRandom()
      const provider = await this.getProvider()
      wallet.connect(provider)
      this.wallet = wallet
    }

    return this.wallet
  }

  async getChainId() {
    return this.chainId as number
  }

  async disconnect(): Promise<void> {
    this.wallet = undefined
    window.location.reload()
  }

  protected onDisconnect(): void {
    this.emit('disconnect')
  }

  async isAuthorized() {
    const account = await this.getAccount()
    return !!account
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
}
