import { useStyleConfig } from '@chakra-ui/system'
import { Account } from '@vocdoni/sdk'
import { Image, IPFSImageProps } from '../layout'
import { useOrganization } from './Organization'

export const Organizationheader = (props: IPFSImageProps) => {
  const styles = useStyleConfig('Organizationheader', props)

  const { organization } = useOrganization()
  if (!organization) return null

  const { header } = (organization as any).metadata as Account
  if (!header) return null

  return <Image src={header} sx={styles} {...props} />
}
