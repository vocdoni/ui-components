import { linkSaasOAuth } from './linkSaasOAuth'

jest.mock('./lib/saasOauthWallet', () => {
  const createMock = jest.fn()
  class MockSaasOAuthWallet {
    create = createMock
  }
  return {
    saasOAuthWallet: MockSaasOAuthWallet,
    __createMock: createMock,
  }
})

const { __createMock: createMock } = jest.requireMock('./lib/saasOauthWallet') as {
  __createMock: jest.Mock
}

describe('linkSaasOAuth', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    localStorage.clear()
    global.fetch = jest.fn()
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
  })

  it('links provider without persisting auth token or wallet', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: async () => '',
    })

    await linkSaasOAuth({
      oAuthServiceUrl: 'https://oauth.example.com',
      oAuthServiceProvider: 'google',
      saasBackendUrl: 'https://saas.example.com',
      provider: 'google',
      authToken: 'session-token',
    })

    expect(createMock).toHaveBeenCalledWith(expect.anything(), { persist: false })
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toBe('https://saas.example.com/auth/oauth')
    const [, request] = (global.fetch as jest.Mock).mock.calls[0]
    expect(request.headers.Authorization).toBe('Bearer session-token')
    expect(localStorage.getItem('authToken')).toBeNull()
  })
})
