import { ChakraProps } from '@chakra-ui/system'
import { Account, AccountData } from '@vocdoni/sdk'
import { PropsWithChildren, createContext, useContext, useEffect } from 'react'
import { useClient } from '../../client'
import { areEqualHexStrings } from '../../utils'
import { OrganizationName } from './Name'
import { useOrganizationReducer } from './use-organization-reducer'

export type OrganizationProviderProps = {
  id?: string
  organization?: AccountData
}

export const useOrganizationProvider = ({ id, organization }: OrganizationProviderProps) => {
  const { client, signer, account: vAccount } = useClient()
  const { state, loading, setOrganization, loadError, updateError } = useOrganizationReducer(organization)

  // fetches organization info, and sets it to the state
  const fetch = () => {
    loading()
    return client.fetchAccountInfo(id).then(setOrganization).catch(loadError)
  }

  // updates organization info, and sets the new result to state
  const update = async (account: Account | Partial<Account>) => {
    if (!vAccount) {
      await fetch()
    }
    if (!areEqualHexStrings(await signer.getAddress(), vAccount?.address)) {
      throw new Error("You're not the owner of this account")
    }

    loading()
    return client
      .updateAccountInfo(account instanceof Account ? account : new Account(account))
      .then(setOrganization)
      .catch(updateError)
  }

  // fetch organization
  useEffect(() => {
    if (!id || !client || state.loading) return
    if (state.loaded && areEqualHexStrings(state.organization?.address, id)) return

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.organization, id, client, state.loading, state.loaded])

  return {
    ...state,
    fetch,
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
