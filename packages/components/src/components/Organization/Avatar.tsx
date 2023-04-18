import { useStyleConfig } from '@chakra-ui/system'
import { Account } from '@vocdoni/sdk'
import { Image, IPFSImageProps } from '../layout'
import { useOrganization } from './Organization'

export const OrganizationAvatar = (props: IPFSImageProps) => {
  const styles = useStyleConfig('OrganizationAvatar', props)

  const { organization } = useOrganization()
  if (!organization) return null

  const { avatar } = (organization as any).metadata as Account
  if (!avatar) return null

  return <Image src={avatar} sx={styles} {...props} />
}
