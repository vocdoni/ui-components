import { useOrganization } from '@vocdoni/react-providers'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '../context/useComponents'
import { linkifyIpfs } from '../shared/ipfs'

export const OrganizationAvatar = (props: ComponentPropsWithoutRef<'img'> & Record<string, unknown>) => {
  const { organization } = useOrganization()
  const { OrganizationAvatar: Slot } = useComponents()

  let avatar = organization?.account.avatar
  if (!avatar) {
    avatar = organization?.account.logo
  }

  return <Slot {...props} src={linkifyIpfs(avatar)} alt={organization?.account.name.default} />
}

export const OrganizationImage = OrganizationAvatar
