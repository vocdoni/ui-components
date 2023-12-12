import { Wallet } from '@ethersproject/wallet'
import { Account, EnvOptions, VocdoniSDKClient } from '@vocdoni/sdk'
import { useEffect } from 'react'
import { useLocalize } from '../i18n/localize'
import { ClientReducerProps, newVocdoniSDKClient, useClientReducer } from './use-client-reducer'

export type ClientProviderProps = ClientReducerProps

export const useClientProvider = ({
  client: c,
  env: e,
  signer: s,
  options: o,
  census3Options: c3o,
}: ClientProviderProps) => {
  const localize = useLocalize()
  const { actions, state } = useClientReducer({
    client: c,
    env: e,
    signer: s,
    options: o,
    census3Options: c3o,
  })

  // update env on updates
  useEffect(() => {
    if (!e) return
    actions.setEnv(e)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [e])

  // fetch account (only with signer connected)
  useEffect(() => {
    if (!state.connected || (state.connected && state.account)) return

    fetchAccount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.account, state.connected, state.env, state.signer])

  // update signer on updates
  useEffect(() => {
    if (!s) return
    actions.setSigner(s)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s])

  // switch account behavior handler
  useEffect(() => {
    if (!('ethereum' in window)) return

    const accChanged = async () => {
      actions.setClient(newVocdoniSDKClient(state.env as EnvOptions, state.signer, state.options))
      // undefine so other effects do their job
      actions.setAccount(undefined)
    }

    ;(window as any).ethereum.on('accountsChanged', accChanged)

    return () => {
      ;(window as any).ethereum.removeListener('accountsChanged', accChanged)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Fetches currently connected account information.
   *
   * @returns {Promise<AccountData>}
   */
  const fetchAccount = () => {
    if (state.loading.fetch) return

    actions.fetchAccount()
    return state.client.fetchAccountInfo().then(actions.setAccount).catch(actions.errorAccount)
  }

  /**
   * Creates an account.
   *
   * @returns {Promise<AccountData>}
   */
  const createAccount = (options?: { account?: Account; faucetPackage?: string; sik?: boolean; password?: string }) => {
    if (state.loading.create) return

    actions.createAccount()
    return state.client.createAccount(options).then(actions.setAccountCreate).catch(actions.errorAccountCreate)
  }

  /**
   * Generates a signer so the implementer can use it to sign transactions.
   * @param seed
   * @returns
   */
  const generateSigner = (seed?: string | string[]) => {
    if (!state.client) {
      throw new Error('No client initialized')
    }

    let signer: Wallet
    if (!seed) {
      state.client.generateRandomWallet()
      signer = state.client.wallet as Wallet
    } else {
      signer = VocdoniSDKClient.generateWalletFromData(seed)
    }

    return signer
  }

  return {
    ...state,
    clear: actions.clear,
    setClient: actions.setClient,
    setSigner: actions.setSigner,
    createAccount,
    fetchAccount,
    generateSigner,
    localize,
  }
}
