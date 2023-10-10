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
}

export const ClientAccountError = 'client:account:error'
export const ClientAccountFetch = 'client:account:fetch'
export const ClientAccountSet = 'client:account:set'
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
  | typeof ClientAccountError
  | typeof ClientAccountFetch
  | typeof ClientAccountSet
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
    account: boolean
  }
  // loading status
  loading: {
    account: boolean
  }
  errors: {
    account: string | null
  }
}

export const clientStateEmpty = (env: EnvOptions, client: VocdoniSDKClient, signer: Wallet | Signer): ClientState => ({
  env: env || EnvOptions.PROD,
  signer,
  client:
    client ||
    new VocdoniSDKClient({
      env: env || EnvOptions.PROD,
    }),
  census3: new VocdoniCensus3Client({ env: env || EnvOptions.PROD }),
  account: undefined,
  balance: -1,
  connected: false,
  loading: {
    account: false,
  },
  loaded: {
    account: false,
  },
  errors: {
    account: null,
  },
})

const clientReducer: Reducer<ClientState, ClientAction> = (state: ClientState, action: ClientAction) => {
  switch (action.type) {
    case ClientAccountFetch: {
      return {
        ...state,
        loading: {
          ...state.loading,
          account: true,
        },
      }
    }
    case ClientAccountError: {
      const error = action.payload as ClientAccountErrorPayload
      return {
        ...state,
        loading: {
          ...state.loading,
          account: false,
        },
        loaded: {
          ...state.loaded,
          account: true,
        },
        errors: {
          ...state.errors,
          account: errorToString(error),
        },
      }
    }
    case ClientAccountSet: {
      const account = action.payload as ClientAccountSetPayload
      return {
        ...state,
        account,
        balance: account?.balance,
        loading: {
          ...state.loading,
          account: false,
        },
        loaded: {
          ...state.loaded,
          account: true,
        },
        errors: {
          ...state.errors,
          account: null,
        },
      }
    }

    case ClientClear: {
      const client = new VocdoniSDKClient({
        env: state.env,
      })
      const census3 = new VocdoniCensus3Client({
        env: state.env,
      })
      return {
        ...state,
        client,
        census3,
        signer: {} as Signer,
        account: undefined,
        balance: -1,
        connected: false,
        loaded: {
          account: false,
        },
        errors: {
          account: null,
        },
      }
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

export const useClientReducer = ({ env, client, signer }: ClientReducerProps) => {
  const [state, dispatch] = useReducer(
    clientReducer,
    clientStateEmpty(env as EnvOptions, client as VocdoniSDKClient, signer as Wallet | Signer)
  )

  // dispatch helper methods
  const clear = () => dispatch({ type: ClientClear })
  const errorAccount = (error: ErrorPayload) => dispatch({ type: ClientAccountError, payload: error })
  const fetchAccount = () => dispatch({ type: ClientAccountFetch })
  const setAccount = (account: AccountData | undefined) => dispatch({ type: ClientAccountSet, payload: account })
  const setClient = (client: VocdoniSDKClient) => dispatch({ type: ClientSet, payload: client })
  const setEnv = (env: ClientEnvSetPayload) => dispatch({ type: ClientEnvSet, payload: env })
  const setSigner = (signer: Wallet | Signer) => dispatch({ type: ClientSignerSet, payload: signer })

  return {
    state,
    dispatch,
    actions: {
      clear,
      errorAccount,
      fetchAccount,
      setAccount,
      setClient,
      setEnv,
      setSigner,
    },
  }
}
