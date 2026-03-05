import { useOrganization } from '@vocdoni/react-providers'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '../context/useComponents'

export const OrganizationDescription = (props: ComponentPropsWithoutRef<'div'> & Record<string, unknown>) => {
  const { organization } = useOrganization()
  const { OrganizationDescription: Slot } = useComponents()

  if (!organization?.account.description?.default) return null

  return <Slot {...props} description={organization.account.description.default} />
}
