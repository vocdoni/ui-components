import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Account, AccountData, areEqualHexStrings } from '@vocdoni/sdk'
import { useEffect, useMemo, useState } from 'react'
import { useClient } from '../client'
import { queryKeys } from '../query/keys'
import { errorToString } from '../utils'

export type OrganizationProviderProps = {
  id?: string
  organization?: AccountData
  queryOptions?: Omit<UseQueryOptions<AccountData, unknown>, 'queryKey' | 'queryFn' | 'enabled'>
  organizationQueryOptions?: Omit<UseQueryOptions<AccountData, unknown>, 'queryKey' | 'queryFn' | 'enabled'>
}

export const useOrganizationProvider = ({
  id,
  organization,
  queryOptions,
  organizationQueryOptions,
}: OrganizationProviderProps) => {
  const { client, signer, account: vAccount } = useClient()
  const queryClient = useQueryClient()
  const [orgId, setOrgId] = useState<string | undefined>(id || organization?.address)

  useEffect(() => {
    if (!id || id === orgId) return
    setOrgId(id)
  }, [id, orgId])

  useEffect(() => {
    if (!organization) return
    if (organization.address === orgId) return
    setOrgId(organization.address)
    queryClient.setQueryData(queryKeys.organization.byId(organization.address), organization)
  }, [organization, orgId, queryClient])

  const queryKey = useMemo(() => {
    if (!orgId) return null
    return queryKeys.organization.byId(orgId)
  }, [orgId])

  const organizationQuery = useQuery({
    queryKey: queryKey || ['organization', 'disabled'],
    queryFn: () => client.fetchAccount(orgId as string),
    enabled: !!orgId,
    initialData: organization,
    ...(queryOptions ?? organizationQueryOptions),
  })

  const updateMutation = useMutation({
    mutationFn: async (account: Account | Partial<Account>) => {
      let ownerAccount = vAccount
      if (!ownerAccount) {
        const address = await signer.getAddress()
        ownerAccount = await client.fetchAccount(address)
      }
      if (!areEqualHexStrings(await signer.getAddress(), ownerAccount?.address)) {
        throw new Error("You're not the owner of this account")
      }

      return client.updateAccountInfo(account instanceof Account ? account : new Account(account))
    },
    onSuccess: (data) => {
      if (data?.address) {
        setOrgId(data.address)
        queryClient.setQueryData(queryKeys.organization.byId(data.address), data)
      }
    },
  })

  const fetch = async (id?: string) => {
    const identifier = id || orgId
    if (!identifier) return
    if (identifier !== orgId) setOrgId(identifier)

    return queryClient.fetchQuery({
      queryKey: queryKeys.organization.byId(identifier),
      queryFn: () => client.fetchAccount(identifier),
    })
  }

  const update = async (account: Account | Partial<Account>) => {
    return updateMutation.mutateAsync(account)
  }

  const loading = organizationQuery.isFetching || updateMutation.isPending
  const loaded =
    organizationQuery.isSuccess || organizationQuery.isError || updateMutation.isSuccess || updateMutation.isError
  const errors = {
    load: organizationQuery.error ? errorToString(organizationQuery.error) : null,
    update: updateMutation.error ? errorToString(updateMutation.error) : null,
  }

  return {
    loading,
    loaded,
    id: orgId,
    errors,
    organization: organizationQuery.data,
    fetch,
    update,
  }
}
