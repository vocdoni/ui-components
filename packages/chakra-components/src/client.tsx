import { ToastProvider } from '@chakra-ui/toast'
import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { AccountData, ClientOptions, EnvOptions, VocdoniSDKClient } from '@vocdoni/sdk'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import merge from 'ts-deepmerge'
import { TranslationProvider, useTranslate } from './i18n/translate'
import type { Translations } from './i18n/translations'
import { translations as ltranslations } from './i18n/translations'

export type ClientProviderProps = {
  env?: Lowercase<keyof typeof EnvOptions>
  client?: VocdoniSDKClient
  signer?: Wallet | Signer
}

export const useClientProvider = ({ env: e, client: c, signer: s }: ClientProviderProps) => {
  const trans = useTranslate()
  const [client, setClient] = useState<VocdoniSDKClient>(c as VocdoniSDKClient)
  const [signer, setSigner] = useState<Wallet | Signer>(s as Wallet | Signer)
  const [env, setEnv] = useState<string>(e as string)
  const [account, setAccount] = useState<AccountData>()
  const [balance, setBalance] = useState<number>(-1)

  // initialize client
  useEffect(() => {
    if (client) return

    if ((!env || (env && !env.length)) && !client) {
      throw new Error('You must provide a valid env or client to the ClientProvider')
    }

    const opts: ClientOptions = {
      env: env as EnvOptions,
    }

    if (signer) {
      opts.wallet = signer
    }

    setClient(new VocdoniSDKClient(opts))
  }, [env, c])

  // update env
  useEffect(() => {
    if (!e) return
    setEnv(e)
  }, [e])

  // update signer
  useEffect(() => {
    if (!s) return
    changeSigner(s)
  }, [s])

  // fetch balance
  useEffect(() => {
    if (!client?.wallet || !account || !signer) return
    ;(async () => {
      await fetchBalance()
    })()
  }, [client, account, signer])

  // switch account behavior handler
  useEffect(() => {
    if (!('ethereum' in window)) return

    const accChanged = async (accs: string[]) => {
      setClient(
        new VocdoniSDKClient({
          env: env as EnvOptions,
          wallet: signer,
        })
      )
      // set to null so other effects do their job
      setAccount(undefined)
    }

    ;(window as any).ethereum.on('accountsChanged', accChanged)

    return () => {
      ;(window as any).ethereum.removeListener('accountsChanged', accChanged)
    }
  }, [])

  /**
   * Fetches currently connected account information.
   *
   * @returns {Promise<AccountData>}
   */
  const fetchAccount = async () => {
    let acc: AccountData

    try {
      acc = await client.fetchAccountInfo()
      setAccount(acc)

      return acc
    } catch (e) {
      console.error('could not fetch account:', e)
    }
  }

  /**
   * Creates an account.
   *
   * @returns {Promise<AccountData>}
   */
  const createAccount = async () => {
    let acc: AccountData

    try {
      acc = await client.createAccount()
      setAccount(acc)

      return acc
    } catch (e) {
      console.error('could not create account:', e)
    }
  }

  /**
   * Fetches and sets to state current account balance.
   *
   * @returns {Promise<number>}
   */
  const fetchBalance = async () => {
    try {
      if (!account) {
        throw new Error('Account not available')
      }

      if (account.balance <= 10 && env !== 'prod') {
        await client.collectFaucetTokens()
        const acc = await client.fetchAccountInfo()
        setBalance(acc.balance)

        return acc.balance
      }

      setBalance(account.balance)
      return account.balance
    } catch (e) {
      console.error('could not fetch balance:', e)
    }
  }

  /**
   * Changes the current signer in state and in the initialized SDK client.
   * @param {Wallet|Signer} signer
   */
  const changeSigner = (signer: Wallet | Signer) => {
    if (!client) {
      throw new Error('No client initialized')
    }

    setSigner(signer)
    client.wallet = signer
  }

  return {
    account,
    balance,
    client,
    createAccount,
    env,
    fetchAccount,
    fetchBalance,
    setClient,
    setSigner: changeSigner,
    signer,
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
