import { canUseWorkers, clearLocationHash } from './browser'

describe('browser helpers', () => {
  const originalURL = globalThis.URL

  afterEach(() => {
    globalThis.URL = originalURL
    vi.restoreAllMocks()
  })

  it('clears the hash without dropping the query string', () => {
    window.history.replaceState({}, '', '/election/process?preview=true#0xprivate')

    clearLocationHash()

    expect(window.location.pathname).toBe('/election/process')
    expect(window.location.search).toBe('?preview=true')
    expect(window.location.hash).toBe('')
  })

  it('returns false when createObjectURL is unavailable', () => {
    globalThis.URL = {} as typeof URL

    expect(canUseWorkers()).toBe(false)
  })
})
