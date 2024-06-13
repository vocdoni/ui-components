import { createContext, PropsWithChildren, useContext } from 'react'
import { OrganizationProviderProps, useOrganizationProvider } from './use-organization-provider'

export type OrganizationState = ReturnType<typeof useOrganizationProvider>

export const OrganizationContext = createContext<OrganizationState | undefined>(undefined)

export const useOrganization = () => {
  const ctxt = useContext(OrganizationContext)
  if (!ctxt) {
    throw new Error(
      'useOrganization returned `undefined`, maybe you forgot to wrap the component within <OrganizationProvider />?'
    )
  }

  return ctxt
}

export type OrganizationProviderComponentProps = OrganizationProviderProps

export const OrganizationProvider = ({ children, ...rest }: PropsWithChildren<OrganizationProviderComponentProps>) => {
  const value = useOrganizationProvider(rest)

  return <OrganizationContext.Provider value={value}>{children}</OrganizationContext.Provider>
}
OrganizationProvider.displayName = 'OrganizationProvider'
