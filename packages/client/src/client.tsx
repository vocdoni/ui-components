import { ClientOptions, EnvOptions, VocdoniSDKClient } from '@vocdoni/sdk';
import { createContext, useContext, useEffect, useState } from 'react';

export interface ClientSettings extends ClientOptions {}

export const useClientProvider = ({env} : {env: EnvOptions}) => {
  const [client, setClient] = useState<VocdoniSDKClient>()

  useEffect(() => {
    if (!env || (env && !env.length) || client) return

    setClient(new VocdoniSDKClient({
      env,
    }))
  }, [env])

  return {
    client,
  }
}

export type ClientState = ReturnType<typeof useClientProvider>

export const ClientContext = createContext<ClientState | undefined>(undefined)

export const useClientContext = () => {
  const ctxt = useContext(ClientContext)
  if (!ctxt) {
    throw new Error('useClientContext returned `undefined`, maybe you forgot to wrap the component within <ClientProvider />?')
  }

  return ctxt
}

export const ClientProvider = ({env, ...rest} : {env: EnvOptions}) => {
  const {client} = useClientProvider({env})

  return (
    <ClientContext.Provider value={{client}} {...rest} />
  )
}
