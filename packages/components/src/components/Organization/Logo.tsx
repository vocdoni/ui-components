import { useStyleConfig } from '@chakra-ui/system'
import { Account } from '@vocdoni/sdk'
import { Image, IPFSImageProps } from '../layout'
import { useOrganization } from './Organization'

export const OrganizationLogo = (props: IPFSImageProps) => {
  const styles = useStyleConfig('OrganizationLogo', props)

  const { organization } = useOrganization()
  if (!organization) return null

  const { logo } = (organization as any).metadata as Account
  if (!logo) return null

  return <Image src={logo} sx={styles} {...props} />
}
