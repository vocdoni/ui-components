import { useOrganization } from '../../providers'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '../context/useComponents'

export const OrganizationName = (props: ComponentPropsWithoutRef<'h1'> & Record<string, unknown>) => {
  const { organization } = useOrganization()
  const { OrganizationName: Slot } = useComponents()

  if (!organization) return null

  const name = organization.account.name.default || organization.address
  return <Slot {...props} name={name} />
}
