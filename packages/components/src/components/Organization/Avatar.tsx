import { useStyleConfig } from '@chakra-ui/system'
import { Image, IPFSImageProps } from '../layout'
import { useOrganization } from './Organization'

export const OrganizationAvatar = (props: IPFSImageProps) => {
  const styles = useStyleConfig('OrganizationAvatar', props)

  const { organization } = useOrganization()
  if (!organization) return null

  let avatar = ((organization as any).metadata as any).media.avatar
  if (!avatar) {
    // fallback to deprecated logo field
    avatar = ((organization as any).metadata as any).media.logo
  }
  if (!avatar) return null

  return <Image src={avatar} sx={styles} {...props} />
}
