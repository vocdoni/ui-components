import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '~components/context/useComponents'
import { useOrganization } from '~providers'

export const OrganizationDescription = (props: ComponentPropsWithoutRef<'div'> & Record<string, unknown>) => {
  const { organization } = useOrganization()
  const { OrganizationDescription: Slot } = useComponents()

  if (!organization?.account.description?.default) return null

  return <Slot {...props} description={organization.account.description.default} />
}
