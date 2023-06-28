import { VocdoniSDKClient } from '@vocdoni/sdk'
import { Chain, Connector, normalizeChainId, Address, UserRejectedRequestError } from '@wagmi/core'
import { Signer, ethers } from 'ethers'
import { getAddress } from 'ethers/lib/utils'

const IS_SERVER = typeof window === 'undefined'

export class oAuthConnector extends Connector {
  ready = !IS_SERVER
  readonly id = 'oauth'
  readonly name = 'OAuth'

  private chainId: number | undefined
  private provider: ethers.providers.BaseProvider | undefined
  private wallet: ethers.Wallet | undefined

  constructor(config: { chains: Chain[]; options: any }) {
    super(config)
    this.chainId = config.chains[0].id
  }

  async connect() {
    try {
      if (!(await NextAuth.isActiveSession())) {
        await NextAuth.connect()
      }

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
      this.provider = ethers.getDefaultProvider()
    }
    return this.provider
  }

  async getSigner(): Promise<Signer | undefined> {
    if (!this.wallet) {
      const wallet = VocdoniSDKClient.generateWalletFromData(await NextAuth.getWalletSeedFromSession())
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
    NextAuth.destroySession()
    window.location.reload()
  }

  protected onDisconnect(): void {
    this.emit('disconnect')
  }

  async isAuthorized() {
    if (!(await NextAuth.isActiveSession())) {
      this.wallet = undefined
      return false
    }

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

// Handles the NextAuth flow, using the NextAuth API
class NextAuth {
  static async isActiveSession(): Promise<boolean> {
    return !!(await NextAuth.getSession())
  }

  static async getSession() {
    const res = await fetch(`/api/auth/session`)
    let session = await res.json()
    if (Object.keys(session).length === 0) {
      return false
    }

    return session
  }

  static async connect() {
    window.location.href = `/api/auth/signin?callbackUrl=${window.location.href}`
  }

  static async getWalletSeedFromSession() {
    const res = await fetch(`/api/auth/getWalletSeedFromSession`)
    return (await res.json()).seed
  }

  static async destroySession() {
    let res = await fetch(`/api/auth/csrf`)
    const csrf = (await res.json()).csrfToken

    res = await fetch(`/api/auth/signout?csrfToken=${csrf}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // @ts-expect-error
      body: new URLSearchParams({
        csrfToken: csrf,
        json: true,
      }),
    })
  }
}
