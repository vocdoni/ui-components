import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { AccountData, ClientOptions, EnvOptions, VocdoniSDKClient } from '@vocdoni/sdk'
import { createContext, useContext, useEffect, useState } from 'react'

import { ReactNode } from 'react'

export interface ClientSettings extends ClientOptions {}

type ClientProviderProps = {
  env?: Lowercase <keyof typeof EnvOptions>
  client?: VocdoniSDKClient
  signer?: Wallet | Signer
}

export const useClientProvider = ({env: e, client: c, signer: s} : ClientProviderProps) => {
  const [ client, setClient ] = useState<VocdoniSDKClient>(c as VocdoniSDKClient)
  const [ signer, setSigner ] = useState<Wallet|Signer>(s as Wallet|Signer)
  const [ env, setEnv ] = useState<string>(e as string)
  const [ account, setAccount ] = useState<AccountData>()
  const [ balance, setBalance ] = useState<number>(-1)

  // initialize client
  useEffect(() => {
    if (client) return

    if ((!env || (env && !env.length)) && !client) {
      throw new Error('You must provide a valid env or client to the ClientProvider')
    }

    const opts : ClientOptions = {
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

  // fetch account
  useEffect(() => {
    if (!client || account || !signer) return

    ;(async () => {
      await fetchAccount()
    })()

  }, [client, account, signer])

  // fetch balance
  useEffect(() => {
    if (!client || !account || !signer) return

    ;(async () => {
      await fetchBalance()
    })()

  }, [client, account, signer])

  const fetchAccount = async () => {
    let acc : AccountData

    try {
      acc = await client.createAccount()
      setAccount(acc)

      return acc
    } catch (e) {
      console.error('could not fetch account:', e)
    }
  }

  const fetchBalance = async () => {
    try {
      if (!account) {
        throw new Error('Account not available')
      }

      if (account.balance <= 10 && env !== 'prod') {
        await client.collectFaucetTokens()
        const acc = await client.fetchAccountInfo()
        setBalance(acc.balance)

        return
      }

      setBalance(account.balance)
    } catch (e) {
      console.error('could not fetch balance:', e)
    }
  }

  const changeSigner = (signer: Wallet|Signer) => {
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
    env,
    signer,
    fetchAccount,
    fetchBalance,
    setClient,
    setSigner: changeSigner,
  }
}

export type ClientState = ReturnType<typeof useClientProvider>

export const ClientContext = createContext<ClientState | undefined>(undefined)

export const useClientContext = <T extends VocdoniSDKClient>() => {
  const ctxt = useContext(ClientContext)

  if (!ctxt) {
    throw new Error('useClientContext returned `undefined`, maybe you forgot to wrap the component within <ClientProvider />?')
  }

  return {
    ...ctxt,
    // Allow client extensions
    client: ctxt.client as T,
  }
}

type ClientProviderComponentProps = ClientProviderProps & {
  children?: ReactNode
}

export const ClientProvider = ({env, client, signer,...rest} : ClientProviderComponentProps) => {
  const value = useClientProvider({env, client, signer})

  return (
    <ClientContext.Provider value={value} {...rest} />
  )
}
