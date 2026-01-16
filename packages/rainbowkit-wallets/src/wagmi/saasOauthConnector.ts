import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import type { CreateConnectorFn } from 'wagmi'
import { saasOAuthWallet } from '../lib/saasOauthWallet'
import { clearAuthStorageKeys } from '../storageCleanup'
import { AuthStorageKeys } from '../storageKeys'
import { localStorageConnector } from './localStorageConnector'

export type saasOauthConnectorOptions = {
  oAuthServiceUrl: string
  oAuthServiceProvider?: string
  saasBackendUrl: string
  id?: string
  name?: string
  mode?: 'login' | 'link'
  getAuthToken?: () => string | null
}

type ApiErrorResponse = {
  code: number
  message: string
}

type OAuthLoginResponse = {
  token: string
  expirity: string
  registered: boolean
}

const STORAGE_TOKEN_NAME = AuthStorageKeys.Token
const STORAGE_EXPIRY_NAME = AuthStorageKeys.Expiry
const STORAGE_REGISTERED_NAME = AuthStorageKeys.Registered

/**
 * Creates a SaaS OAuth connector that integrates with a backend service
 */
export function saasOAuthConnector(options: saasOauthConnectorOptions): CreateConnectorFn {
  if (!options.oAuthServiceUrl) throw new Error('oAuthServiceUrl is required')
  if (!options.saasBackendUrl) throw new Error('saasBackendUrl is required')

  return localStorageConnector({
    id: options.id,
    name: options.name,
    async createWallet() {
      const provider = createPublicClient({
        chain: mainnet,
        transport: http(),
      })

      let wallet = await saasOAuthWallet.getWallet(provider)

      if (!wallet) {
        const w = new saasOAuthWallet(options.oAuthServiceUrl, options.oAuthServiceProvider || '')
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

        const mode = options.mode || 'login'
        if (mode === 'login') {
          clearAuthStorageKeys()
        }
        const authToken = options.getAuthToken?.() || localStorage.getItem(STORAGE_TOKEN_NAME)
        const endpoint = mode === 'link' ? '/auth/oauth/link' : '/oauth/login'
        const headers = authToken
          ? { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` }
          : {
              'Content-Type': 'application/json',
            }

        const response = await fetch(options.saasBackendUrl + endpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            email: params.userEmail,
            firstName: firstname,
            lastName: lastname,
            userOauthSignature: userOauthSignature,
            oauthSignature: params.oauthSignedEmail,
            address: params.wallet.account.address,
            provider: options.id,
          }),
        })

        // Try to parse backend error body
        let data: ApiErrorResponse | OAuthLoginResponse | null = null
        try {
          const raw = await response.text()
          data = raw ? (JSON.parse(raw) as ApiErrorResponse | OAuthLoginResponse) : null
        } catch (e) {
          throw new Error('Failed to parse response from backend')
        }

        if (!response.ok) {
          const { code, message } = data as ApiErrorResponse
          switch (code) {
            case 40101:
              throw new Error('OAuthAccountConflictError')
            default:
              console.error('OAuth login failed', data)
              throw new Error(message || 'OAuth login failed')
          }
        }

        if (mode === 'login') {
          if (!data) {
            throw new Error('Failed to parse response from backend')
          }
          const { token, expirity: expiry, registered } = data as OAuthLoginResponse

          localStorage.setItem(STORAGE_TOKEN_NAME, token)
          localStorage.setItem(STORAGE_EXPIRY_NAME, expiry)
          if (typeof registered !== 'undefined') {
            localStorage.setItem(STORAGE_REGISTERED_NAME, String(registered))
          }
        }

        wallet = params.wallet
      }
    },
  })
}
