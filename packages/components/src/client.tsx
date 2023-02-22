import { ClientOptions, EnvOptions, VocdoniSDKClient } from '@vocdoni/sdk'
import { createContext, useContext, useEffect, useState } from 'react'

import { ReactNode } from 'react'

export interface ClientSettings extends ClientOptions {}

type ClientProviderProps = {
  env?: Lowercase <keyof typeof EnvOptions>
  client?: VocdoniSDKClient
}

export const useClientProvider = ({env, client: c} : ClientProviderProps) => {
  const [client, setClient] = useState<VocdoniSDKClient>(c as VocdoniSDKClient)

  useEffect(() => {
    if (client) return

    if ((!env || (env && !env.length)) && !client) {
      throw new Error('You must provide a valid env or client to the ClientProvider')
    }

    setClient(new VocdoniSDKClient({
      env: env as EnvOptions,
    }))

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

  return {
    ...ctxt,
    // Allow client extensions
    client: ctxt.client as T,
  }
}

type ClientProviderComponentProps = ClientProviderProps & {
  children?: ReactNode
}

export const ClientProvider = ({env, client, ...rest} : ClientProviderProps) => {
  const value = useClientProvider({env, client})

  return (
    <ClientContext.Provider value={value} {...rest} />
  )
}
