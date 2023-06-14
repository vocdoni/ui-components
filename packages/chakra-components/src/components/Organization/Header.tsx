import { useStyleConfig } from '@chakra-ui/system'
import { Image, IPFSImageProps } from '../layout'
import { useOrganization } from './Organization'

export const OrganizationHeader = (props: IPFSImageProps) => {
  const styles = useStyleConfig('OrganizationHeader', props)

  const { organization } = useOrganization()

  if (!organization) return null
  if (!organization.account.header) return null

  const { header } = organization.account
  if (!header) return null

  return <Image src={header} sx={styles} {...props} />
}
