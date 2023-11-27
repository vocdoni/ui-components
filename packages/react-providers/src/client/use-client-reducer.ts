import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { AccountData, EnvOptions, VocdoniCensus3Client, VocdoniSDKClient } from '@vocdoni/sdk'
import { Reducer, useReducer } from 'react'
import type { ErrorPayload } from '../types'
import { errorToString } from '../utils'

export type ClientEnv = `${EnvOptions}` | EnvOptions

export type ClientReducerProps = {
  client?: VocdoniSDKClient
  env?: ClientEnv
  signer?: Wallet | Signer
  options?: {
    api_url?: string
    faucet_url?: string
  }
}

export const ClientAccountCreate = 'client:account:create'
export const ClientAccountCreateError = 'client:account:create::error'
export const ClientAccountError = 'client:account::error'
export const ClientAccountFetch = 'client:account:fetch'
export const ClientAccountFetchError = 'client:account:fetch::error'
export const ClientAccountSet = 'client:account:set'
export const ClientAccountSetCreate = 'client:account:setcreate'
export const ClientClear = 'client:clear'
export const ClientEnvSet = 'client:env:set'
export const ClientSet = 'client:set'
export const ClientSignerSet = 'client:signer:set'

export type ClientAccountErrorPayload = ErrorPayload
export type ClientAccountSetPayload = AccountData
export type ClientEnvSetPayload = ClientEnv
export type ClientSetPayload = VocdoniSDKClient
export type ClientSignerSetPayload = Signer | Wallet

export type ClientActionPayload =
  | ClientAccountErrorPayload
  | ClientAccountSetPayload
  | ClientEnvSetPayload
  | ClientSetPayload
  | ClientSignerSetPayload

export type ClientActionType =
  | typeof ClientAccountCreate
  | typeof ClientAccountCreateError
  | typeof ClientAccountError
  | typeof ClientAccountFetch
  | typeof ClientAccountFetchError
  | typeof ClientAccountSet
  | typeof ClientAccountSetCreate
  | typeof ClientClear
  | typeof ClientEnvSet
  | typeof ClientSet
  | typeof ClientSignerSet

export interface ClientAction {
  type: ClientActionType
  payload?: ClientActionPayload
}

export interface ClientState {
  client: VocdoniSDKClient
  census3: VocdoniCensus3Client
  env: EnvOptions
  account: AccountData | undefined
  signer: Wallet | Signer
  balance: number
  // determines if a wallet is connected to the client
  connected: boolean
  // loaded status
  loaded: {
    // todo: remove in a future major release
    // has both create and fetch status, maintained for backwards compatibility
    account: boolean
    create: boolean
    fetch: boolean
  }
  // loading status
  loading: {
    // todo: remove in a future major release
    // has both create and fetch status, maintained for backwards compatibility
    account: boolean
    create: boolean
    fetch: boolean
  }
  errors: {
    // todo: remove in a future major release
    // has both create and fetch status, maintained for backwards compatibility
    account: string | null
    create: string | null
    fetch: string | null
  }
  options?: {
    api_url?: string
    faucet_url?: string
  }
}

export const clientStateEmpty = (
  env: EnvOptions,
  client: VocdoniSDKClient | null,
  signer: Wallet | Signer,
  options: { api_url?: string; faucet_url?: string } | undefined
): ClientState => ({
  env: env || EnvOptions.PROD,
  signer,
  client:
    client ||
    new VocdoniSDKClient({
      env: env || EnvOptions.PROD,
      faucet: options?.faucet_url ? { url: options.faucet_url, token_limit: 99999999 } : undefined, //TODO: Why token_limit is mandatory?
      api_url: options?.api_url || undefined,
    }),
  census3: new VocdoniCensus3Client({ env: env || EnvOptions.PROD }),
  account: undefined,
  balance: -1,
  connected: false,
  loading: {
    account: false,
    create: false,
    fetch: false,
  },
  loaded: {
    account: false,
    create: false,
    fetch: false,
  },
  errors: {
    account: null,
    create: null,
    fetch: null,
  },
  options,
})

const clientReducer: Reducer<ClientState, ClientAction> = (state: ClientState, action: ClientAction) => {
  switch (action.type) {
    case ClientAccountFetch:
    case ClientAccountCreate: {
      const isCreate = action.type === ClientAccountCreate
      return {
        ...state,
        loading: {
          ...state.loading,
          account: true,
          create: isCreate ? true : state.loading.create,
          fetch: !isCreate ? true : state.loading.fetch,
        },
      }
    }
    case ClientAccountError:
    case ClientAccountCreateError: {
      const error = action.payload as ClientAccountErrorPayload
      const isCreate = action.type === ClientAccountCreateError
      return {
        ...state,
        loading: {
          ...state.loading,
          account: false,
          create: isCreate ? false : state.loading.create,
          fetch: !isCreate ? false : state.loading.fetch,
        },
        loaded: {
          ...state.loaded,
          account: true,
          create: isCreate ? true : state.loaded.create,
          fetch: !isCreate ? true : state.loaded.fetch,
        },
        errors: {
          ...state.errors,
          account: errorToString(error),
          create: isCreate ? errorToString(error) : state.errors.create,
          fetch: !isCreate ? errorToString(error) : state.errors.fetch,
        },
      }
    }
    case ClientAccountSetCreate:
    case ClientAccountSet: {
      const account = action.payload as ClientAccountSetPayload
      const isCreate = action.type === ClientAccountSetCreate
      return {
        ...state,
        account,
        balance: account?.balance,
        loading: {
          ...state.loading,
          account: false,
          create: isCreate ? false : state.loading.create,
          fetch: !isCreate ? false : state.loading.fetch,
        },
        loaded: {
          ...state.loaded,
          account: true,
          create: isCreate ? true : state.loaded.create,
          fetch: !isCreate ? true : state.loaded.fetch,
        },
        errors: {
          ...state.errors,
          account: null,
          create: null,
          fetch: null,
        },
      }
    }
    case ClientClear: {
      return clientStateEmpty(state.env, null, null as unknown as Signer, state.options)
    }
    case ClientSet: {
      const client = action.payload as ClientSetPayload
      return {
        ...state,
        client,
        connected: !!client.wallet,
      }
    }
    case ClientEnvSet: {
      const env = action.payload as ClientEnvSetPayload as EnvOptions
      // redefine client to use new environment
      const client = new VocdoniSDKClient({
        env,
        wallet: state.signer,
        faucet: state.options?.faucet_url ? { url: state.options.faucet_url, token_limit: 99999999 } : undefined,
        api_url: state.options?.api_url || undefined,
      })
      const census3 = new VocdoniCensus3Client({ env })
      return {
        ...state,
        account: undefined,
        balance: -1,
        client,
        census3,
        env,
        connected: !!client.wallet,
      }
    }
    case ClientSignerSet: {
      const signer = action.payload as ClientSignerSetPayload
      const client = new VocdoniSDKClient({
        env: state.env,
        wallet: signer,
        faucet: state.options?.faucet_url ? { url: state.options.faucet_url, token_limit: 99999999 } : undefined,
        api_url: state.options?.api_url || undefined,
      })
      return {
        ...state,
        client,
        signer,
        connected: !!client.wallet,
      }
    }
    default:
      return state
  }
}

export const useClientReducer = ({ env, client, signer, options }: ClientReducerProps) => {
  const [state, dispatch] = useReducer(
    clientReducer,
    clientStateEmpty(env as EnvOptions, client as VocdoniSDKClient, signer as Wallet | Signer, options)
  )

  // dispatch helper methods
  const clear = () => dispatch({ type: ClientClear })
  const createAccount = () => dispatch({ type: ClientAccountCreate })
  const errorAccount = (error: ErrorPayload) => dispatch({ type: ClientAccountError, payload: error })
  const errorAccountCreate = (error: ErrorPayload) => dispatch({ type: ClientAccountCreateError, payload: error })
  const fetchAccount = () => dispatch({ type: ClientAccountFetch })
  const setAccount = (account: AccountData | undefined) => dispatch({ type: ClientAccountSet, payload: account })
  const setAccountCreate = (account: AccountData | undefined) =>
    dispatch({ type: ClientAccountSetCreate, payload: account })
  const setClient = (client: VocdoniSDKClient) => dispatch({ type: ClientSet, payload: client })
  const setEnv = (env: ClientEnvSetPayload) => dispatch({ type: ClientEnvSet, payload: env })
  const setSigner = (signer: Wallet | Signer) => dispatch({ type: ClientSignerSet, payload: signer })

  return {
    state,
    dispatch,
    actions: {
      clear,
      createAccount,
      errorAccount,
      errorAccountCreate,
      fetchAccount,
      setAccount,
      setAccountCreate,
      setClient,
      setEnv,
      setSigner,
    },
  }
}
