import { Account, AccountData } from '@vocdoni/sdk'

export type SerializedOrganization = Omit<Partial<AccountData>, 'account'> & {
  account?: ConstructorParameters<typeof Account>[0] | Account
}

export type OrganizationLike = AccountData | SerializedOrganization

export const normalizeOrganization = (organization?: OrganizationLike): AccountData | undefined => {
  if (!organization) return undefined

  const rawAccount = organization.account
  const accountData =
    rawAccount instanceof Account
      ? rawAccount
      : new Account({
          name: (rawAccount as any)?.name ?? (rawAccount as any)?._name?.default ?? '',
          description: (rawAccount as any)?.description ?? (rawAccount as any)?._description?.default ?? '',
          header: (rawAccount as any)?.header ?? (rawAccount as any)?._header ?? '',
          avatar: (rawAccount as any)?.avatar ?? (rawAccount as any)?._avatar ?? '',
          logo: (rawAccount as any)?.logo ?? (rawAccount as any)?._logo ?? '',
          feed: (rawAccount as any)?.feed ?? (rawAccount as any)?._feed?.default ?? '',
          meta: (rawAccount as any)?.meta ?? (rawAccount as any)?._meta ?? [],
        })

  return {
    ...organization,
    account: accountData,
  } as AccountData
}
