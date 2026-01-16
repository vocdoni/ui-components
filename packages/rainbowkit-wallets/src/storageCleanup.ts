import localStorageWallet from './lib/localStorageWallet'
import { AuthStorageKeys } from './storageKeys'

export const clearAuthStorageKeys = () => {
  localStorage.removeItem(AuthStorageKeys.Token)
  localStorage.removeItem(AuthStorageKeys.Expiry)
  localStorage.removeItem(AuthStorageKeys.Registered)
}

export const clearLocalStorageWalletSeed = () => {
  localStorage.removeItem(localStorageWallet.storageItemName)
  sessionStorage.removeItem(localStorageWallet.storageItemEncryptionItemName)
}
