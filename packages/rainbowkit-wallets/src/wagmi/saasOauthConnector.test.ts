import { localStorageConnector } from './localStorageConnector'
import { saasOAuthConnector } from './saasOauthConnector'

const { getWalletMock, createMock } = vi.hoisted(() => ({
  getWalletMock: vi.fn(),
  createMock: vi.fn(),
}))

vi.mock('./localStorageConnector', () => ({
  localStorageConnector: vi.fn(),
}))

vi.mock('../lib/saasOauthWallet', () => {
  class MockSaasOAuthWallet {
    static getWallet = getWalletMock
    create = createMock
    constructor() {
      return this
    }
  }

  return {
    saasOAuthWallet: MockSaasOAuthWallet,
  }
})

const localStorageConnectorMock = localStorageConnector as ReturnType<typeof vi.fn>

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
      signMessage: vi.fn().mockResolvedValue('signature') as any,
    },
  })
}

describe('saasOAuthConnector', () => {
  let capturedParams: { createWallet?: () => Promise<void> } | null = null

  beforeEach(() => {
    capturedParams = null
    localStorage.clear()
    vi.resetAllMocks()
    localStorageConnectorMock.mockImplementation((params) => {
      capturedParams = params
      return vi.fn() as any
    })
    global.fetch = vi.fn() as any
  })

  it('stores auth token when logging in', async () => {
    setupWalletMocks()
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
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

    const [, request] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0]
    expect((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0]).toBe('https://saas.example.com/oauth/login')
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
    expect(localStorage.getItem('authRegistered')).toBe('true')
  })

  it('does not store auth token when linking an account', async () => {
    setupWalletMocks()
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
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

    const [, request] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0]
    expect((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0]).toBe('https://saas.example.com/auth/oauth')
    expect(request.method).toBe('POST')
    expect(request.headers.Authorization).toBe('Bearer session-token')
    expect(localStorage.getItem('authToken')).toBeNull()
    expect(localStorage.getItem('authExpiry')).toBeNull()
  })

  it('clears auth storage keys before starting a login', async () => {
    setupWalletMocks()
    localStorage.setItem('authToken', 'old-token')
    localStorage.setItem('authExpiry', 'old-expiry')
    localStorage.setItem('authRegistered', 'true')
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      text: async () => JSON.stringify({ code: 500, message: 'nope' }),
    })

    saasOAuthConnector({
      oAuthServiceUrl: 'https://oauth.example.com',
      saasBackendUrl: 'https://saas.example.com',
      id: 'google',
      name: 'Google',
    })

    await expect(capturedParams?.createWallet?.()).rejects.toThrow('nope')

    expect(localStorage.getItem('authToken')).toBeNull()
    expect(localStorage.getItem('authExpiry')).toBeNull()
    expect(localStorage.getItem('authRegistered')).toBeNull()
  })
})
