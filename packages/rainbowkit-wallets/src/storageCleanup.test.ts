import localStorageWallet from './lib/localStorageWallet'
import { clearAuthStorageKeys, clearLocalStorageWalletSeed } from './storageCleanup'
import { AuthStorageKeys } from './storageKeys'

describe('storage cleanup helpers', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('clears auth storage keys only', () => {
    localStorage.setItem(AuthStorageKeys.Token, 'token')
    localStorage.setItem(AuthStorageKeys.Expiry, 'expiry')
    localStorage.setItem(AuthStorageKeys.Registered, 'true')
    localStorage.setItem('other-key', 'keep')

    clearAuthStorageKeys()

    expect(localStorage.getItem(AuthStorageKeys.Token)).toBeNull()
    expect(localStorage.getItem(AuthStorageKeys.Expiry)).toBeNull()
    expect(localStorage.getItem(AuthStorageKeys.Registered)).toBeNull()
    expect(localStorage.getItem('other-key')).toBe('keep')
  })

  it('clears the local storage wallet seed and encryption key', () => {
    localStorage.setItem(localStorageWallet.storageItemName, 'seed')
    sessionStorage.setItem(localStorageWallet.storageItemEncryptionItemName, 'secret')

    clearLocalStorageWalletSeed()

    expect(localStorage.getItem(localStorageWallet.storageItemName)).toBeNull()
    expect(sessionStorage.getItem(localStorageWallet.storageItemEncryptionItemName)).toBeNull()
  })
})
