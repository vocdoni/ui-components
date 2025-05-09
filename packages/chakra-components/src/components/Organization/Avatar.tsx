import { useStyleConfig } from '@chakra-ui/react'
import { useOrganization, withRegistry } from '@vocdoni/react-providers'
import { OrganizationAvatarProps } from '../../types'
import { Avatar, Image, IPFSImageProps } from '../layout'

const BaseOrganizationAvatar = (props: OrganizationAvatarProps) => {
  const styles = useStyleConfig('OrganizationAvatar', props)
  const { organization } = useOrganization()

  let avatar = organization?.account.avatar
  if (!avatar) {
    // fallback to deprecated logo field
    avatar = organization?.account.logo
  }

  return <Avatar src={avatar} name={organization?.account.name.default} sx={styles} {...props} />
}
BaseOrganizationAvatar.displayName = 'BaseOrganizationAvatar'

export const OrganizationAvatar = withRegistry(BaseOrganizationAvatar, 'Organization', 'Avatar')
OrganizationAvatar.displayName = 'OrganizationAvatar'

export const OrganizationImage = (props: IPFSImageProps) => {
  const styles = useStyleConfig('OrganizationImage', props)
  const { organization } = useOrganization()

  let avatar = organization?.account.avatar
  if (!avatar) {
    // fallback to deprecated logo field
    avatar = organization?.account.logo
  }

  return <Image src={avatar} sx={styles} {...props} />
}
OrganizationImage.displayName = 'OrganizationImage'
