import { VocdoniSDKClient } from '@vocdoni/sdk'
import { PropsWithChildren, createContext, useContext } from 'react'
import merge from 'ts-deepmerge'
import { locales } from '../i18n/locales'
import { LocaleProvider, LocaleProviderProps } from '../i18n/localize'
import { ClientProviderProps, useClientProvider } from './use-client-provider'

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

type InternalClientProviderComponentProps = PropsWithChildren<ClientProviderProps>
export type ClientProviderComponentProps = InternalClientProviderComponentProps & LocaleProviderProps

/**
 * Required internal client provider so we can use useLocalize in useClientProvider.
 */
const InternalClientProvider = ({ env, client, signer, ...rest }: InternalClientProviderComponentProps) => {
  const value = useClientProvider({ env, client, signer, ...rest })

  return <ClientContext.Provider value={value} {...rest} />
}

export const ClientProvider = ({ locale, datesLocale, ...rest }: ClientProviderComponentProps) => {
  const loc = {
    locale: merge(locales, locale || {}),
    datesLocale,
  }

  return (
    <LocaleProvider {...loc}>
      <InternalClientProvider {...rest} />
    </LocaleProvider>
  )
}
