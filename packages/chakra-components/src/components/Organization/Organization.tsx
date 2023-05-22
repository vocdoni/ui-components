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
  const { client, signer, setSigner, account: vAccount } = useClient()
  const { state, loading, setAccount, loadError, updateError } = useOrganizationReducer(organization)

  // fetches organization info, and sets it to the state
  const fetch = async (id: string) => {
    loading()
    try {
      const account = await client.fetchAccountInfo(id)
      setAccount(account)

      return account
    } catch (e) {
      if (typeof e === 'string') {
        loadError(e)
      }
      if (e instanceof Error) {
        loadError(e.message)
      }
    }
  }

  // updates organization info, and sets the new result to state
  const update = async (account: Account | Partial<Account>) => {
    if (!areEqualHexStrings(await signer.getAddress(), vAccount?.address)) {
      throw new Error("You're not the owner of this account")
    }

    loading()
    return client
      .updateAccountInfo(account instanceof Account ? account : new Account(account))
      .then(setAccount)
      .catch(updateError)
  }

  // fetch organization
  useEffect(() => {
    if (!id || !client || state.loading) return
    if (state.loaded && areEqualHexStrings(state.organization?.address, id)) return

    fetch(id)
  }, [state.organization, id, client])

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
