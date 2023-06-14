import { ToastProvider } from '@chakra-ui/toast'
import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { Account, EnvOptions, VocdoniSDKClient } from '@vocdoni/sdk'
import { PropsWithChildren, createContext, useContext, useEffect } from 'react'
import merge from 'ts-deepmerge'
import { TranslationProvider, useTranslate } from './i18n/translate'
import type { Translations } from './i18n/translations'
import { translations as ltranslations } from './i18n/translations'
import { useClientReducer } from './use-client-reducer'

export type ClientProviderProps = {
  client?: VocdoniSDKClient
  env?: Lowercase<keyof typeof EnvOptions>
  signer?: Wallet | Signer
}

export const useClientProvider = ({ client: c, env: e, signer: s }: ClientProviderProps) => {
  const trans = useTranslate()
  const { actions, state } = useClientReducer({
    client: c,
    env: e,
    signer: s,
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

  // fetch balance (only with signer connected)
  useEffect(() => {
    if (!state.connected || !state.account) return

    fetchBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.account, state.connected])

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
      actions.setClient(
        new VocdoniSDKClient({
          env: state.env as EnvOptions,
          wallet: state.signer,
        })
      )
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
    if (state.loading.account) return

    actions.fetchAccount()
    return state.client.fetchAccountInfo().then(actions.setAccount).catch(actions.errorAccount)
  }

  /**
   * Fetches and sets to state current account balance.
   *
   * @returns {Promise<number>}
   */
  const fetchBalance = async () => {
    if (state.loading.balance) return

    try {
      if (!state.account) {
        throw new Error('Account not available')
      }
      // tell state machine we're fetching balance
      actions.fetchBalance()

      if (state.account.balance <= 10 && state.env !== 'prod') {
        await state.client.collectFaucetTokens()
        const acc = await state.client.fetchAccountInfo()
        actions.setBalance(acc.balance)

        return acc.balance
      }

      actions.setBalance(state.account.balance)
      return state.account.balance
    } catch (e: any) {
      actions.errorBalance(e)
    }
  }

  /**
   * Creates an account.
   *
   * @returns {Promise<AccountData>}
   */
  const createAccount = (account?: Account, faucetPackage?: string) => {
    if (state.loading.account) return

    actions.fetchAccount()
    return state.client.createAccount({ account, faucetPackage }).then(actions.setAccount).catch(actions.errorAccount)
  }

  return {
    ...state,
    clear: actions.clear,
    createAccount,
    fetchAccount,
    fetchBalance,
    setClient: actions.setClient,
    trans,
  }
}

export type ClientState = ReturnType<typeof useClientProvider>

export const ClientContext = createContext<ClientState | undefined>(undefined)

export const useClient = <T extends VocdoniSDKClient>() => {
  const ctxt = useContext(ClientContext)

  if (!ctxt) {
    throw new Error('useClient returned `undefined`, maybe you forgot to wrap the component within <ClientProvider />?')
  }

  return {
    ...ctxt,
    // Allow client extensions
    client: ctxt.client as T,
  }
}

export type InternalClientProviderComponentProps = PropsWithChildren<ClientProviderProps>

export type ClientProviderComponentProps = InternalClientProviderComponentProps & {
  defaultLanguage?: string
  language?: string
  translations?: Translations
}

/**
 * Required internal client provider so we can use useTranslate in it.
 */
const InternalClientProvider = ({ env, client, signer, ...rest }: ClientProviderComponentProps) => {
  const value = useClientProvider({ env, client, signer })

  return <ClientContext.Provider value={value} {...rest} />
}

export const ClientProvider = ({ defaultLanguage, language, translations, ...rest }: ClientProviderComponentProps) => {
  const trans = {
    defaultLanguage: defaultLanguage || 'en',
    language,
    translations: merge(ltranslations, translations || {}),
  }

  return (
    <TranslationProvider {...trans}>
      <>
        <ToastProvider />
        <InternalClientProvider {...rest} />
      </>
    </TranslationProvider>
  )
}
