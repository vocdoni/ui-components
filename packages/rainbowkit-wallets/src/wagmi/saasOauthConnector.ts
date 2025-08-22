import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { saasOAuthWallet } from '../lib/saasOauthWallet'
import { localStorageConnector } from './localStorageConnector'

export type saasOauthConnectorOptions = {
  oAuthServiceUrl: string
  oAuthServiceProvider?: string
  saasBackendUrl: string
}

const STORAGE_TOKEN_NAME = 'authToken'
const STORAGE_EXPIRY_NAME = 'authExpiry'

/**
 * Creates a SaaS OAuth connector that integrates with a backend service
 */
export function saasOAuthConnector(options: saasOauthConnectorOptions) {
  if (!options.oAuthServiceUrl) throw new Error('oAuthServiceUrl is required')
  if (!options.saasBackendUrl) throw new Error('saasBackendUrl is required')

  return localStorageConnector({
    async createWallet() {
      const provider = createPublicClient({
        chain: mainnet,
        transport: http(),
      })

      // @ts-ignore - Viem v2 type issue with client extension
      let wallet = await saasOAuthWallet.getWallet(provider)

      if (!wallet) {
        const w = new saasOAuthWallet(options.oAuthServiceUrl, options.oAuthServiceProvider || '')
        // @ts-ignore - Viem v2 type issue with client extension
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

        const response = await fetch(options.saasBackendUrl + '/oauth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: params.userEmail,
            firstName: firstname,
            lastName: lastname,
            userOauthSignature: userOauthSignature,
            oauthSignature: params.oauthSignedEmail,
            address: params.wallet.account.address,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to send data to SaaS backend')
        }

        const data = await response.json()
        const token = data['token']
        const expiry = data['expirity']
        localStorage.setItem(STORAGE_TOKEN_NAME, token)
        localStorage.setItem(STORAGE_EXPIRY_NAME, expiry)

        wallet = params.wallet
      }
    },
  })
}
