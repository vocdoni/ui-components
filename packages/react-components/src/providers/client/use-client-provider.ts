import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Account, EnvOptions, VocdoniSDKClient } from '@vocdoni/sdk'
import { useEffect, useMemo, useState } from 'react'
import { useLocalize } from '../i18n/localize'
import { queryKeys } from '../query/keys'
import { errorToString } from '../utils'
import { ClientReducerProps, newVocdoniCensus3, newVocdoniSDKClient } from './client-utils'

export type ClientProviderProps = ClientReducerProps

export const useClientProvider = ({
  client: c,
  env: e,
  signer: s,
  options: o,
  census3Options: c3o,
}: ClientProviderProps) => {
  const localize = useLocalize()
  const queryClient = useQueryClient()

  const [env, setEnvState] = useState<EnvOptions>((e as EnvOptions) || EnvOptions.PROD)
  const [signer, setSignerState] = useState<Wallet | Signer | undefined>(s)
  const [options, setOptionsState] = useState(o)
  const [census3Options, setCensus3OptionsState] = useState(c3o)
  const [client, setClientState] = useState<VocdoniSDKClient>(
    c || newVocdoniSDKClient((e as EnvOptions) || EnvOptions.PROD, s, o)
  )
  const [census3, setCensus3State] = useState(newVocdoniCensus3((e as EnvOptions) || EnvOptions.PROD, c3o?.api_url))
  const [address, setAddress] = useState<string | undefined>(undefined)

  const connected = !!client?.wallet && Object.keys(client.wallet as unknown as Record<string, unknown>).length > 0

  useEffect(() => {
    let active = true

    if (!client?.wallet) {
      setAddress(undefined)
      return () => {
        active = false
      }
    }

    client.wallet
      .getAddress()
      .then((addr) => {
        if (active) setAddress(addr)
      })
      .catch(() => {
        if (active) setAddress(undefined)
      })

    return () => {
      active = false
    }
  }, [client])

  const accountKey = useMemo(() => {
    if (!address) return null
    return queryKeys.client.account(String(env), address)
  }, [address, env])

  const accountQuery = useQuery({
    queryKey: accountKey || ['client', 'account', 'disabled'],
    queryFn: async () => {
      return client.fetchAccount(address as string)
    },
    enabled: false,
  })

  const createAccountMutation = useMutation({
    mutationFn: (opts?: { account?: Account; faucetPackage?: string; sik?: boolean; password?: string }) =>
      client.createAccount(opts),
    onSuccess: (data) => {
      if (data?.address) {
        setAddress(data.address)
        queryClient.setQueryData(queryKeys.client.account(String(env), data.address), data)
      }
    },
  })

  const updateAccountMutation = useMutation({
    mutationFn: (account: Account) => client.updateAccountInfo(account),
    onSuccess: (data) => {
      if (data?.address) {
        setAddress(data.address)
        queryClient.setQueryData(queryKeys.client.account(String(env), data.address), data)
      }
    },
  })

  const setEnv = (nextEnv: EnvOptions) => {
    setEnvState(nextEnv)
    setClientState(newVocdoniSDKClient(nextEnv, signer, options))
    setCensus3State(newVocdoniCensus3(nextEnv, census3Options?.api_url))
    setAddress(undefined)
    queryClient.removeQueries({ queryKey: ['client'] })
  }

  const setSigner = (nextSigner: Wallet | Signer) => {
    setSignerState(nextSigner)
    setClientState(newVocdoniSDKClient(env, nextSigner, options))
    setAddress(undefined)
    queryClient.removeQueries({ queryKey: ['client'] })
  }

  const setClient = (nextClient: VocdoniSDKClient) => {
    setClientState(nextClient)
    setAddress(undefined)
    queryClient.removeQueries({ queryKey: ['client'] })
  }

  useEffect(() => {
    if (!e || e === env) return
    setEnv(e as EnvOptions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [e])

  useEffect(() => {
    if (!s || s === signer) return
    setSigner(s)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s])

  useEffect(() => {
    if (o === options) return
    setOptionsState(o)
    setClientState(newVocdoniSDKClient(env, signer, o))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [o])

  useEffect(() => {
    if (c3o === census3Options) return
    setCensus3OptionsState(c3o)
    setCensus3State(newVocdoniCensus3(env, c3o?.api_url))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c3o])

  useEffect(() => {
    if (!c || c === client) return
    setClientState(c)
    setAddress(undefined)
    queryClient.removeQueries({ queryKey: ['client'] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c])

  // switch account behavior handler
  useEffect(() => {
    if (!('ethereum' in window)) return

    const accChanged = async () => {
      setClientState(newVocdoniSDKClient(env, signer, options))
      setAddress(undefined)
      queryClient.removeQueries({ queryKey: ['client'] })
    }

    ;(window as any).ethereum.on('accountsChanged', accChanged)

    return () => {
      ;(window as any).ethereum.removeListener('accountsChanged', accChanged)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // auto-fetch account when connected
  useEffect(() => {
    if (!connected || accountQuery.data) return
    fetchAccount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, env, signer, address])

  /**
   * Fetches currently connected account information.
   */
  const fetchAccount = async () => {
    if (!client.wallet) return
    if (accountQuery.isFetching) return

    const nextAddress = address || (await client.wallet.getAddress())
    if (!nextAddress) return
    if (nextAddress !== address) setAddress(nextAddress)

    return queryClient.fetchQuery({
      queryKey: queryKeys.client.account(String(env), nextAddress),
      queryFn: () => client.fetchAccount(nextAddress),
    })
  }

  /**
   * Creates an account.
   */
  const createAccount = (opts?: { account?: Account; faucetPackage?: string; sik?: boolean; password?: string }) => {
    if (createAccountMutation.isPending) return
    return createAccountMutation.mutateAsync(opts)
  }

  /**
   * Updates an account.
   */
  const updateAccount = (account: Account) => {
    if (updateAccountMutation.isPending) return
    return updateAccountMutation.mutateAsync(account)
  }

  /**
   * Generates a signer so the implementer can use it to sign transactions.
   * @param seed
   * @returns
   */
  const generateSigner = (seed?: string | string[]) => {
    if (!client) {
      throw new Error('No client initialized')
    }

    let wallet: Wallet
    if (!seed) {
      client.generateRandomWallet()
      wallet = client.wallet as Wallet
    } else {
      wallet = VocdoniSDKClient.generateWalletFromData(seed)
    }

    return wallet
  }

  const account = accountQuery.data
  const balance = account?.balance ?? -1

  const loading = {
    account: accountQuery.isFetching || createAccountMutation.isPending || updateAccountMutation.isPending,
    fetch: accountQuery.isFetching,
    create: createAccountMutation.isPending,
    update: updateAccountMutation.isPending,
  }

  const loaded = {
    account:
      accountQuery.isSuccess ||
      accountQuery.isError ||
      createAccountMutation.isSuccess ||
      updateAccountMutation.isSuccess,
    fetch: accountQuery.isSuccess || accountQuery.isError,
    create: createAccountMutation.isSuccess || createAccountMutation.isError,
    update: updateAccountMutation.isSuccess || updateAccountMutation.isError,
  }

  const errors = {
    account: accountQuery.error ? errorToString(accountQuery.error) : null,
    fetch: accountQuery.error ? errorToString(accountQuery.error) : null,
    create: createAccountMutation.error ? errorToString(createAccountMutation.error) : null,
    update: updateAccountMutation.error ? errorToString(updateAccountMutation.error) : null,
  }

  const clear = () => {
    queryClient.removeQueries({ queryKey: ['client'] })
    setSignerState(null as unknown as Signer)
    setClientState(newVocdoniSDKClient(env, undefined, options))
    setAddress(undefined)
  }

  return {
    env,
    signer,
    client,
    census3,
    account,
    balance,
    connected,
    loading,
    loaded,
    errors,
    options,
    census3Options,
    clear,
    setClient,
    setSigner,
    setEnv,
    createAccount,
    fetchAccount,
    generateSigner,
    localize,
    updateAccount,
  }
}
