import { createWebWorker } from './webWorker'

describe('createWebWorker', () => {
  const originalTerminate = (globalThis as any).Worker?.prototype?.terminate
  const originalMockedWindowURL = (globalThis as any).MockedWindowURL
  const originalMockedCreateObjectURL = originalMockedWindowURL?.createObjectURL
  const originalMockedRevokeObjectURL = originalMockedWindowURL?.revokeObjectURL

  afterEach(() => {
    vi.unstubAllGlobals()
    if ((globalThis as any).Worker?.prototype) {
      ;(globalThis as any).Worker.prototype.terminate = originalTerminate
    }
    if (originalMockedWindowURL) {
      originalMockedWindowURL.createObjectURL = originalMockedCreateObjectURL
      originalMockedWindowURL.revokeObjectURL = originalMockedRevokeObjectURL
    }
    vi.restoreAllMocks()
  })

  it('returns null when createObjectURL is unavailable', () => {
    vi.stubGlobal('Blob', Blob)
    vi.stubGlobal('URL', {})
    if (originalMockedWindowURL) {
      originalMockedWindowURL.createObjectURL = undefined
    }

    const result = createWebWorker(() => {})

    expect(result).toBeNull()
  })

  it('revokes the blob URL when the worker is terminated', () => {
    const terminate = vi.fn()
    const revokeObjectURL = vi.fn()
    const createObjectURL = vi.fn(() => 'blob:worker')
    ;(globalThis as any).Worker.prototype.terminate = terminate
    vi.stubGlobal('Blob', Blob)
    vi.stubGlobal('URL', {
      createObjectURL,
      revokeObjectURL,
    })
    if (originalMockedWindowURL) {
      originalMockedWindowURL.createObjectURL = createObjectURL
      originalMockedWindowURL.revokeObjectURL = revokeObjectURL
    }

    const instance = createWebWorker(() => {})
    instance?.terminate()

    expect(terminate).toHaveBeenCalledTimes(1)
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:worker')
  })
})
