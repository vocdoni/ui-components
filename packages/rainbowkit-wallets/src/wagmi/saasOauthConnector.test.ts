import { saasOAuthConnector } from './saasOauthConnector'
import { localStorageConnector } from './localStorageConnector'
import { saasOAuthWallet } from '../lib/saasOauthWallet'

jest.mock('./localStorageConnector', () => ({
  localStorageConnector: jest.fn(),
}))

jest.mock('../lib/saasOauthWallet', () => {
  class MockSaasOAuthWallet {
    static getWallet = jest.fn()
    static __createMock = jest.fn()
    create = MockSaasOAuthWallet.__createMock
    constructor() {
      return this
    }
  }

  return {
    saasOAuthWallet: MockSaasOAuthWallet,
  }
})

const localStorageConnectorMock = localStorageConnector as jest.Mock
const getWalletMock = (saasOAuthWallet as unknown as { getWallet: jest.Mock }).getWallet
const createMock = (saasOAuthWallet as unknown as { __createMock: jest.Mock }).__createMock

const setupWalletMocks = () => {
  getWalletMock.mockResolvedValue(false)
  createMock.mockResolvedValue({
    userEmail: 'ada@example.com',
    userName: 'Ada Lovelace',
    oauthSignedEmail: 'signed-email',
    wallet: {
      account: {
        address: '0xabc',
      },
      signMessage: jest.fn().mockResolvedValue('signature'),
    },
  })
}

describe('saasOAuthConnector', () => {
  let capturedParams: { createWallet?: () => Promise<void> } | null = null

  beforeEach(() => {
    capturedParams = null
    localStorage.clear()
    jest.resetAllMocks()
    localStorageConnectorMock.mockImplementation((params) => {
      capturedParams = params
      return jest.fn()
    })
    global.fetch = jest.fn()
  })

  it('stores auth token when logging in', async () => {
    setupWalletMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({ token: 'token-123', expirity: 'exp-123', registered: true }),
    })

    saasOAuthConnector({
      oAuthServiceUrl: 'https://oauth.example.com',
      saasBackendUrl: 'https://saas.example.com',
      id: 'google',
      name: 'Google',
    })

    await capturedParams?.createWallet?.()

    const [, request] = (global.fetch as jest.Mock).mock.calls[0]
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toBe('https://saas.example.com/oauth/login')
    expect(request.method).toBe('POST')
    expect(JSON.parse(request.body)).toMatchObject({
      email: 'ada@example.com',
      firstName: 'Ada',
      lastName: 'Lovelace',
      userOauthSignature: 'signature',
      oauthSignature: 'signed-email',
      address: '0xabc',
      provider: 'google',
    })
    expect(localStorage.getItem('authToken')).toBe('token-123')
    expect(localStorage.getItem('authExpiry')).toBe('exp-123')
  })

  it('does not store auth token when linking an account', async () => {
    setupWalletMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({ token: 'token-456', expirity: 'exp-456' }),
    })

    saasOAuthConnector({
      oAuthServiceUrl: 'https://oauth.example.com',
      saasBackendUrl: 'https://saas.example.com',
      id: 'google',
      name: 'Google',
      mode: 'link',
      getAuthToken: () => 'session-token',
    })

    await capturedParams?.createWallet?.()

    const [, request] = (global.fetch as jest.Mock).mock.calls[0]
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toBe('https://saas.example.com/auth/oauth/link')
    expect(request.method).toBe('POST')
    expect(request.headers.Authorization).toBe('Bearer session-token')
    expect(localStorage.getItem('authToken')).toBeNull()
    expect(localStorage.getItem('authExpiry')).toBeNull()
  })
})
