import { AuthStorageKeys } from './storageKeys'

describe('AuthStorageKeys', () => {
  it('exposes stable auth storage keys', () => {
    expect(AuthStorageKeys.Token).toBe('authToken')
    expect(AuthStorageKeys.Expiry).toBe('authExpiry')
    expect(AuthStorageKeys.Registered).toBe('authRegistered')
  })
})
