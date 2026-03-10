import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '~components/context/useComponents'
import { linkifyIpfs } from '~components/shared/ipfs'
import { useOrganization } from '~providers'

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
