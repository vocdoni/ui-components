import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { Account, AccountData, areEqualHexStrings } from '@vocdoni/sdk'
import { useEffect, useMemo, useState } from 'react'
import { useClient } from '~providers/client'
import { queryKeys } from '~providers/query/keys'
import { errorToString } from '~providers/utils'
import { normalizeOrganization, OrganizationLike } from './normalized'

export type OrganizationProviderProps = {
  id?: string
  organization?: OrganizationLike
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
  const normalizedOrganization = useMemo(() => normalizeOrganization(organization), [organization])
  const [orgId, setOrgId] = useState<string | undefined>(id || normalizedOrganization?.address)

  useEffect(() => {
    if (!id || id === orgId) return
    setOrgId(id)
  }, [id, orgId])

  useEffect(() => {
    if (!normalizedOrganization) return
    if (normalizedOrganization.address === orgId) return
    setOrgId(normalizedOrganization.address)
    queryClient.setQueryData(queryKeys.organization.byId(normalizedOrganization.address), normalizedOrganization)
  }, [normalizedOrganization, orgId, queryClient])

  const queryKey = useMemo(() => {
    if (!orgId) return null
    return queryKeys.organization.byId(orgId)
  }, [orgId])

  const organizationQuery = useQuery({
    queryKey: queryKey || ['organization', 'disabled'],
    queryFn: async () => normalizeOrganization(await client.fetchAccount(orgId as string)) as AccountData,
    enabled: !!orgId,
    initialData: normalizedOrganization,
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

      return normalizeOrganization(
        await client.updateAccountInfo(account instanceof Account ? account : new Account(account))
      )
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
      queryFn: async () => normalizeOrganization(await client.fetchAccount(identifier)) as AccountData,
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
