import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { AccountData, EnvOptions, VocdoniCensus3Client, VocdoniSDKClient } from '@vocdoni/sdk'
import { Reducer, useReducer } from 'react'
import type { ErrorPayload } from '../types'
import { errorToString } from '../utils'

export type ClientEnv = `${EnvOptions}` | EnvOptions

export type ClientReducerPropsOptions = {
  api_url?: string
  faucet_url?: string
}

export type Census3Options = {
  api_url?: string
}

export type ClientReducerProps = {
  client?: VocdoniSDKClient
  env?: ClientEnv
  signer?: Wallet | Signer
  options?: ClientReducerPropsOptions
  census3Options?: Census3Options
}

export const ClientAccountCreate = 'client:account:create'
export const ClientAccountCreateError = 'client:account:create::error'
export const ClientAccountFetch = 'client:account:fetch'
export const ClientAccountFetchError = 'client:account:fetch::error'
export const ClientAccountSet = 'client:account:set'
export const ClientAccountReset = 'client:account:reset'
export const ClientAccountSetCreate = 'client:account:setcreate'
export const ClientAccountSetUpdate = 'client:account:setupdate'
export const ClientAccountUpdate = 'client:account:update'
export const ClientAccountUpdateError = 'client:account:update::error'
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
  | typeof ClientAccountFetch
  | typeof ClientAccountFetchError
  | typeof ClientAccountReset
  | typeof ClientAccountSet
  | typeof ClientAccountSetCreate
  | typeof ClientAccountSetUpdate
  | typeof ClientAccountUpdate
  | typeof ClientAccountUpdateError
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
    update: boolean
    fetch: boolean
  }
  // loading status
  loading: {
    // todo: remove in a future major release
    // has both create and fetch status, maintained for backwards compatibility
    account: boolean
    create: boolean
    update: boolean
    fetch: boolean
  }
  errors: {
    // todo: remove in a future major release
    // has both create and fetch status, maintained for backwards compatibility
    account: string | null
    create: string | null
    update: string | null
    fetch: string | null
  }
  options?: {
    api_url?: string
    faucet_url?: string
  }
  census3Options?: Census3Options
}

export const clientStateEmpty = (
  env: EnvOptions,
  client: VocdoniSDKClient | null,
  signer: Wallet | Signer,
  options: ClientReducerPropsOptions | undefined,
  census3Options: Census3Options | undefined
): ClientState => ({
  env: env || EnvOptions.PROD,
  signer,
  client: client || newVocdoniSDKClient(env || EnvOptions.PROD, undefined, options),
  census3: newVocdoniCensus3(env || EnvOptions.PROD, census3Options?.api_url),
  account: undefined,
  balance: -1,
  connected: false,
  loading: {
    account: false,
    create: false,
    update: false,
    fetch: false,
  },
  loaded: {
    account: false,
    create: false,
    update: false,
    fetch: false,
  },
  errors: {
    account: null,
    create: null,
    update: null,
    fetch: null,
  },
  options,
  census3Options,
})

const clientReducer: Reducer<ClientState, ClientAction> = (state: ClientState, action: ClientAction) => {
  switch (action.type) {
    case ClientAccountFetch:
    case ClientAccountUpdate:
    case ClientAccountCreate: {
      const isCreate = action.type === ClientAccountCreate
      const isFetch = action.type === ClientAccountFetch
      const isUpdate = action.type === ClientAccountUpdate
      return {
        ...state,
        loading: {
          ...state.loading,
          account: true,
          create: isCreate ? true : state.loading.create,
          fetch: isFetch ? true : state.loading.fetch,
          update: isUpdate ? true : state.loading.update,
        },
        errors: {
          ...state.errors,
          account: null,
          create: isCreate ? null : state.errors.create,
          fetch: isFetch ? null : state.errors.fetch,
          update: isUpdate ? null : state.errors.update,
        },
      }
    }
    case ClientAccountFetchError:
    case ClientAccountUpdateError:
    case ClientAccountCreateError: {
      const error = action.payload as ClientAccountErrorPayload
      const isCreate = action.type === ClientAccountCreateError
      const isFetch = action.type === ClientAccountFetchError
      const isUpdate = action.type === ClientAccountUpdateError
      return {
        ...state,
        loading: {
          ...state.loading,
          account: false,
          create: isCreate ? false : state.loading.create,
          fetch: isFetch ? false : state.loading.fetch,
          update: isUpdate ? false : state.loading.update,
        },
        loaded: {
          ...state.loaded,
          account: true,
          create: isCreate ? true : state.loaded.create,
          fetch: isFetch ? true : state.loaded.fetch,
          update: isUpdate ? true : state.loaded.update,
        },
        errors: {
          ...state.errors,
          account: errorToString(error),
          create: isCreate ? errorToString(error) : state.errors.create,
          fetch: isFetch ? errorToString(error) : state.errors.fetch,
          update: isUpdate ? errorToString(error) : state.errors.update,
        },
      }
    }
    case ClientAccountSetCreate:
    case ClientAccountSetUpdate:
    case ClientAccountSet: {
      const account = action.payload as ClientAccountSetPayload
      const isCreate = action.type === ClientAccountSetCreate
      const isFetch = action.type === ClientAccountSet
      const isUpdate = action.type === ClientAccountSetUpdate

      return {
        ...state,
        account,
        balance: account?.balance,
        loading: {
          ...state.loading,
          account: false,
          create: isCreate ? false : state.loading.create,
          fetch: isFetch ? false : state.loading.fetch,
          update: isUpdate ? false : state.loading.update,
        },
        loaded: {
          ...state.loaded,
          account: true,
          create: isCreate ? true : state.loaded.create,
          fetch: isFetch ? true : state.loaded.fetch,
          update: isUpdate ? true : state.loaded.update,
        },
        errors: {
          ...state.errors,
          account: null,
          create: null,
          fetch: null,
          update: null,
        },
      }
    }
    case ClientAccountReset: {
      return {
        ...state,
        account: undefined,
        loaded: {
          account: false,
          create: false,
          fetch: false,
          update: false,
        },
        errors: {
          account: null,
          create: null,
          fetch: null,
          update: null,
        },
      }
    }
    case ClientClear: {
      return clientStateEmpty(state.env, null, null as unknown as Signer, state.options, state.census3Options)
    }
    case ClientSet: {
      const client = action.payload as ClientSetPayload
      return {
        ...state,
        client,
        connected: client.wallet ? !!Object.keys(client.wallet as unknown as any).length : false,
      }
    }
    case ClientEnvSet: {
      const env = action.payload as ClientEnvSetPayload as EnvOptions
      // redefine client to use new environment
      const client = newVocdoniSDKClient(env, state.signer, state.options)
      const census3 = newVocdoniCensus3(env, state.census3Options?.api_url)
      return {
        ...state,
        account: undefined,
        balance: -1,
        client,
        census3,
        env,
        connected: client.wallet ? !!Object.keys(client.wallet as unknown as any).length : false,
      }
    }
    case ClientSignerSet: {
      const signer = action.payload as ClientSignerSetPayload
      const client = newVocdoniSDKClient(state.env, signer, state.options)
      return {
        ...state,
        client,
        signer,
        connected: client.wallet ? !!Object.keys(client.wallet as unknown as any).length : false,
      }
    }
    default:
      return state
  }
}

export const newVocdoniSDKClient = (
  env: EnvOptions,
  signer: Wallet | Signer | undefined,
  options: ClientReducerPropsOptions | undefined
): VocdoniSDKClient => {
  return new VocdoniSDKClient({
    env,
    wallet: signer,
    faucet: options?.faucet_url ? { url: options.faucet_url } : undefined,
    api_url: options?.api_url || undefined,
  })
}

export const newVocdoniCensus3 = (env: EnvOptions, api_url?: string): VocdoniCensus3Client => {
  return new VocdoniCensus3Client({ env, api_url })
}

export const useClientReducer = ({ env, client, signer, options, census3Options }: ClientReducerProps) => {
  const [state, dispatch] = useReducer(
    clientReducer,
    clientStateEmpty(env as EnvOptions, client as VocdoniSDKClient, signer as Wallet | Signer, options, census3Options)
  )

  // dispatch helper methods
  const clear = () => dispatch({ type: ClientClear })
  const clearAccount = () => dispatch({ type: ClientAccountReset })
  const createAccount = () => dispatch({ type: ClientAccountCreate })
  const errorAccount = (error: ErrorPayload) => dispatch({ type: ClientAccountFetchError, payload: error })
  const errorAccountCreate = (error: ErrorPayload) => dispatch({ type: ClientAccountCreateError, payload: error })
  const fetchAccount = () => dispatch({ type: ClientAccountFetch })
  const updateAccount = () => dispatch({ type: ClientAccountUpdate })
  const errorAccountUpdate = (error: ErrorPayload) => dispatch({ type: ClientAccountUpdateError, payload: error })
  const setAccount = (account: AccountData | undefined) => dispatch({ type: ClientAccountSet, payload: account })
  const setAccountCreate = (account: AccountData | undefined) =>
    dispatch({ type: ClientAccountSetCreate, payload: account })
  const setAccountUpdate = (account: AccountData | undefined) =>
    dispatch({ type: ClientAccountSetUpdate, payload: account })
  const setClient = (client: VocdoniSDKClient) => dispatch({ type: ClientSet, payload: client })
  const setEnv = (env: ClientEnvSetPayload) => dispatch({ type: ClientEnvSet, payload: env })
  const setSigner = (signer: Wallet | Signer) => dispatch({ type: ClientSignerSet, payload: signer })

  return {
    state,
    dispatch,
    actions: {
      clear,
      clearAccount,
      createAccount,
      errorAccount,
      errorAccountCreate,
      errorAccountUpdate,
      fetchAccount,
      setAccount,
      setAccountCreate,
      setAccountUpdate,
      setClient,
      setEnv,
      setSigner,
      updateAccount,
    },
  }
}
