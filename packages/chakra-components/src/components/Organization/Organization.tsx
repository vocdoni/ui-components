import { ChakraProps } from '@chakra-ui/system'
import { Account, AccountData } from '@vocdoni/sdk'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useClient } from '../../client'
import { areEqualHexStrings } from '../../utils'
import { OrganizationName } from './Name'

export type OrganizationProviderProps = {
  id?: string
  organization?: AccountData
}

export const useOrganizationProvider = ({ id, organization: data, ...rest }: OrganizationProviderProps) => {
  const { client, signer, setSigner } = useClient()
  const [loading, setLoading] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [organization, setOrganization] = useState<AccountData | undefined>(data)

  const update = (account: Account) => {
    setLoading(true)
    return client
      .updateAccountInfo(account instanceof Account ? account : new Account(account))
      .finally(() => setLoading(false))
  }

  // fetch organization
  useEffect(() => {
    if (!id || !client) return
    if (loaded && areEqualHexStrings(organization?.address, id)) return
    ;(async () => {
      setLoading(true)
      try {
        setOrganization(await client.fetchAccountInfo(id))
        setLoaded(true)
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    })()
  }, [organization, id, loaded, client])

  // set loaded in case organization comes from props
  useEffect(() => {
    if (loaded || !data) return

    setLoaded(true)
  }, [data, loaded])

  return {
    ...rest,
    organization,
    error,
    loading,
    loaded,
    update,
  }
}

export type OrganizationState = ReturnType<typeof useOrganizationProvider>

export const OrganizationContext = createContext<OrganizationState | undefined>(undefined)

export const useOrganization = () => {
  const ctxt = useContext(OrganizationContext)
  if (!ctxt) {
    throw new Error(
      'useElection returned `undefined`, maybe you forgot to wrap the component within <ElectionProvider />?'
    )
  }

  return ctxt
}

export type OrganizationProviderComponentProps = OrganizationProviderProps & ChakraProps

export const OrganizationProvider = ({ children, ...rest }: PropsWithChildren<OrganizationProviderComponentProps>) => {
  const value = useOrganizationProvider(rest)

  return <OrganizationContext.Provider value={value}>{children}</OrganizationContext.Provider>
}
OrganizationProvider.displayName = 'OrganizationProvider'

export const Organization = (props: OrganizationProviderComponentProps) => (
  <OrganizationProvider {...props}>
    <OrganizationName />
  </OrganizationProvider>
)
Organization.displayName = 'Election'