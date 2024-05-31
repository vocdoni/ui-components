import { useStyleConfig } from '@chakra-ui/system'
import { useOrganization } from '@vocdoni/react-providers'
import { Avatar, Image, IPFSAvatarProps, IPFSImageProps } from '../layout'

export const OrganizationAvatar = (props: IPFSAvatarProps) => {
  const styles = useStyleConfig('OrganizationAvatar', props)

  const { organization } = useOrganization()

  let avatar = organization?.account.avatar
  if (!avatar) {
    // fallback to deprecated logo field
    avatar = organization?.account.logo
  }

  return <Avatar src={avatar} name={organization?.account.name.default} sx={styles} {...props} />
}

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
