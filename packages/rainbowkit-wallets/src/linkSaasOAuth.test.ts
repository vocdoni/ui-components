import { linkSaasOAuth } from './linkSaasOAuth'

const { createMock } = vi.hoisted(() => ({
  createMock: vi.fn(),
}))

vi.mock('./lib/saasOauthWallet', () => {
  class MockSaasOAuthWallet {
    create = createMock
  }
  return {
    saasOAuthWallet: MockSaasOAuthWallet,
  }
})

describe('linkSaasOAuth', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    localStorage.clear()
    global.fetch = vi.fn() as any
    createMock.mockResolvedValue({
      userEmail: 'ada@example.com',
      userName: 'Ada Lovelace',
      oauthSignedEmail: 'signed-email',
      wallet: {
        account: {
          address: '0xabc',
        },
        signMessage: vi.fn().mockResolvedValue('signature'),
      },
    })
  })

  it('links provider without persisting auth token or wallet', async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
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
    expect((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0]).toBe('https://saas.example.com/auth/oauth')
    const [, request] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0]
    expect(request.headers.Authorization).toBe('Bearer session-token')
    expect(localStorage.getItem('authToken')).toBeNull()
  })
})
