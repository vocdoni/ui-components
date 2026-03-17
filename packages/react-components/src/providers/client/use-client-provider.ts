import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Account, EnvOptions, VocdoniSDKClient } from '@vocdoni/sdk'
import { useEffect, useMemo, useState } from 'react'
import { hasEthereumProvider } from '~providers/browser'
import { useLocalize } from '~providers/i18n/localize'
import { queryKeys } from '~providers/query/keys'
import { errorToString } from '~providers/utils'
import {
  ClientEnv,
  ClientReducerProps,
  hasSigner,
  newVocdoniCensus3,
  newVocdoniSDKClient,
  normalizeClientEnv,
} from './client-utils'

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

  const initialEnv = normalizeClientEnv(e as ClientEnv | EnvOptions | undefined)
  const [env, setEnvState] = useState<EnvOptions>(initialEnv)
  const [signer, setSignerState] = useState<Wallet | Signer | undefined>(s)
  const [options, setOptionsState] = useState(o)
  const [census3Options, setCensus3OptionsState] = useState(c3o)
  const [client, setClientState] = useState<VocdoniSDKClient>(c || newVocdoniSDKClient(initialEnv, s, o))
  const [census3, setCensus3State] = useState(newVocdoniCensus3(initialEnv, c3o?.api_url))
  const [address, setAddress] = useState<string | undefined>(undefined)

  const connected = hasSigner(client?.wallet)

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

  const setEnv = (nextEnv: ClientEnv | EnvOptions) => {
    const normalizedEnv = normalizeClientEnv(nextEnv)
    setEnvState(normalizedEnv)
    setClientState(newVocdoniSDKClient(normalizedEnv, signer, options))
    setCensus3State(newVocdoniCensus3(normalizedEnv, census3Options?.api_url))
    setAddress(undefined)
    queryClient.removeQueries({ queryKey: ['client'] })
  }

  const setSigner = (nextSigner: Wallet | Signer) => {
    setSignerState(nextSigner)
    const nextClient = newVocdoniSDKClient(env, nextSigner, options)
    // Some signer implementations (e.g. bridged JsonRpcSigner instances) can be dropped by SDK client init.
    // Keep the signer explicitly so downstream provider state can react to post-connect updates.
    if (!hasSigner(nextClient.wallet) && hasSigner(nextSigner)) {
      nextClient.wallet = nextSigner as any
    }
    setClientState(nextClient)
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
    setEnv(e as ClientEnv | EnvOptions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [e])

  useEffect(() => {
    if (!s || s === signer) return
    setSigner(s)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s])

  useEffect(() => {
    if (o === options) return
    const signerFromProps = hasSigner(s) ? (s as Wallet | Signer) : undefined
    const signerToUse = signerFromProps || signer
    setOptionsState(o)
    const nextClient = newVocdoniSDKClient(env, signerToUse, o)
    if (!hasSigner(nextClient.wallet) && hasSigner(signerToUse)) {
      nextClient.wallet = signerToUse as any
    }
    setClientState(nextClient)
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
    if (!hasEthereumProvider()) return

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
