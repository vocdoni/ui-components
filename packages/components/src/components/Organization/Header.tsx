import { useStyleConfig } from '@chakra-ui/system'
import { Image, IPFSImageProps } from '../layout'
import { useOrganization } from './Organization'

export const OrganizationHeader = (props: IPFSImageProps) => {
  const styles = useStyleConfig('OrganizationHeader', props)

  const { organization } = useOrganization()

  if (!organization) return null

  const { header } = ((organization as any).metadata as any).media
  if (!header) return null

  return <Image src={header} sx={styles} {...props} />
}
