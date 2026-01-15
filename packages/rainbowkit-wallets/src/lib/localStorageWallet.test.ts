jest.mock('viem', () => {
  const actual = jest.requireActual('viem')
  return {
    ...actual,
    keccak256: () => '0xmock',
  }
})

import localStorageWallet from './localStorageWallet'

describe('localStorageWallet.createWalletFromData', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('does not persist when persist is false', async () => {
    const createWalletSpy = jest.spyOn(localStorageWallet, 'createWallet').mockResolvedValue({} as any)

    await localStorageWallet.createWalletFromData('seed', {} as any, { persist: false })

    expect(localStorage.getItem(localStorageWallet.storageItemName)).toBeNull()
    createWalletSpy.mockRestore()
  })
})
