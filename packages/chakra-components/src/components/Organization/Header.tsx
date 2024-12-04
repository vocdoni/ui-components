import { useStyleConfig } from '@chakra-ui/react'
import { useOrganization } from '@vocdoni/react-providers'
import { Image, IPFSImageProps } from '../layout'

export const OrganizationHeader = (props: IPFSImageProps) => {
  const styles = useStyleConfig('OrganizationHeader', props)

  const { organization } = useOrganization()

  if (!organization) return null
  const { header } = organization.account

  return <Image src={header} sx={styles} {...props} />
}
