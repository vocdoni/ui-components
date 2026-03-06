import { useOrganization } from '@vocdoni/react-providers'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '../context/useComponents'

export const OrganizationHeader = (props: ComponentPropsWithoutRef<'img'>) => {
  const { organization } = useOrganization()
  const { OrganizationAvatar: Slot } = useComponents()

  let avatar = organization?.account.avatar
  if (!avatar) {
    avatar = organization?.account.logo
  }

  return <Slot {...props} src={avatar} alt={organization?.account.name.default} />
}
