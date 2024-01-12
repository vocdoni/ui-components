import { Account, AccountData, ArchivedAccountData, areEqualHexStrings } from '@vocdoni/sdk'
import { useEffect } from 'react'
import { useClient } from '../client'
import { useOrganizationReducer } from './use-organization-reducer'

export type OrganizationProviderProps = {
  id?: string
  organization?: AccountData | ArchivedAccountData
}

export const useOrganizationProvider = ({ id, organization }: OrganizationProviderProps) => {
  const { client, signer, account: vAccount } = useClient()
  const { state, loading, setOrganization, loadError, updateError } = useOrganizationReducer(organization)

  // fetches organization info, and sets it to the state
  const fetch = (id?: string) => {
    const identifier = id || state.id
    loading(identifier)
    return client.fetchAccountInfo(identifier).then(setOrganization).catch(loadError)
  }

  // updates organization info, and sets the new result to state
  const update = async (account: Account | Partial<Account>) => {
    if (!vAccount) {
      await fetch()
    }
    if (!areEqualHexStrings(await signer.getAddress(), vAccount?.address)) {
      throw new Error("You're not the owner of this account")
    }

    loading(id)
    return client
      .updateAccountInfo(account instanceof Account ? account : new Account(account))
      .then(setOrganization)
      .catch(updateError)
  }

  // fetch organization
  useEffect(() => {
    if (!id || !client || state.loading) return
    if (state.loaded && areEqualHexStrings(state.id, id)) return

    fetch(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.organization, id, client, state.loading, state.loaded])

  return {
    ...state,
    fetch,
    update,
  }
}
