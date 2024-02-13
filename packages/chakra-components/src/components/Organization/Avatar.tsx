import { useStyleConfig } from '@chakra-ui/system'
import { useOrganization } from '@vocdoni/react-providers'
import { Image, IPFSImageProps } from '../layout'

export const OrganizationAvatar = (props: IPFSImageProps) => {
  const styles = useStyleConfig('OrganizationAvatar', props)

  const { organization } = useOrganization()

  let avatar = organization?.data.avatar
  if (!avatar) {
    // fallback to deprecated logo field
    avatar = organization?.data.logo
  }

  return <Image src={avatar} sx={styles} {...props} />
}
