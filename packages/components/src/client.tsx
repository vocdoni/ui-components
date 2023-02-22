import { ClientOptions, EnvOptions, VocdoniSDKClient } from '@vocdoni/sdk'
import {createContext, useContext, useEffect, useState} from 'react'

export interface ClientSettings extends ClientOptions {}

export const useClientProvider = ({env, client: c} : {env: EnvOptions, client?: VocdoniSDKClient}) => {
  const [client, setClient] = useState<VocdoniSDKClient>()

  useEffect(() => {
    if (!env || (env && !env.length) || client) return

    if (c) {
      setClient(c)
    } else {
      setClient(new VocdoniSDKClient({
        env,
      }))
    }

  }, [env, c])

  return {
    client,
  }
}

export type ClientState = ReturnType<typeof useClientProvider>

export const ClientContext = createContext<ClientState | undefined>(undefined)

export const useClientContext = <T extends VocdoniSDKClient>() => {
  const ctxt = useContext(ClientContext)

  if (!ctxt) {
    throw new Error('useClientContext returned `undefined`, maybe you forgot to wrap the component within <ClientProvider />?')
  }

  return {...ctxt, client: ctxt.client as T} // You can specify the type of the VocdoniSDKClient if you extend it
}

export const ClientProvider = ({env, client, ...rest} : {env: EnvOptions, client?: VocdoniSDKClient}) => {
  const value = useClientProvider({env, client})

  return (
    <ClientContext.Provider value={value} {...rest} />
  )
}
