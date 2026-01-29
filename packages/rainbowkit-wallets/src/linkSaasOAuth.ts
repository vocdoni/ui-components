import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { saasOAuthWallet } from './lib/saasOauthWallet'

export type LinkSaasOAuthParams = {
  oAuthServiceUrl: string
  oAuthServiceProvider?: string
  saasBackendUrl: string
  provider: string
  authToken: string
}

type ApiErrorResponse = {
  code?: number
  message?: string
  error?: string
}

export const linkSaasOAuth = async ({
  oAuthServiceUrl,
  oAuthServiceProvider,
  saasBackendUrl,
  provider,
  authToken,
}: LinkSaasOAuthParams) => {
  if (!oAuthServiceUrl) throw new Error('oAuthServiceUrl is required')
  if (!saasBackendUrl) throw new Error('saasBackendUrl is required')
  if (!authToken) throw new Error('authToken is required')

  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  })

  const wallet = new saasOAuthWallet(oAuthServiceUrl, oAuthServiceProvider || '')
  const params = await wallet.create(client, { persist: false })
  const userOauthSignature = await params.wallet.signMessage({
    account: params.wallet.account,
    message: params.oauthSignedEmail,
  })

  let lastname = ''
  const nameData = params.userName.split(' ')
  const firstname = nameData[0]
  if (nameData.length > 1) {
    lastname = nameData[1]
  }

  const response = await fetch(`${saasBackendUrl}/auth/oauth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      email: params.userEmail,
      firstName: firstname,
      lastName: lastname,
      userOauthSignature,
      oauthSignature: params.oauthSignedEmail,
      address: params.wallet.account.address,
      provider,
    }),
  })

  if (response.ok) return

  let data: ApiErrorResponse | null = null
  try {
    const raw = await response.text()
    data = raw ? (JSON.parse(raw) as ApiErrorResponse) : null
  } catch (e) {
    throw new Error('Failed to parse response from backend')
  }

  const message = data?.message || data?.error || 'OAuth link failed'
  throw new Error(message)
}
