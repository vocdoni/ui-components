import { useStyleConfig } from '@chakra-ui/system'
import { Image, IPFSImageProps } from '../layout'
import { useOrganization } from './Organization'

export const OrganizationAvatar = (props: IPFSImageProps) => {
  const styles = useStyleConfig('OrganizationAvatar', props)

  const { organization } = useOrganization()

  let avatar = organization?.account.avatar
  if (!avatar) {
    // fallback to deprecated logo field
    avatar = organization?.account.logo
  }

  return <Image src={avatar} sx={styles} {...props} />
}
