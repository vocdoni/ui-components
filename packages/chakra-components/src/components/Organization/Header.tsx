import { useStyleConfig } from '@chakra-ui/react'
import { useOrganization, withRegistry } from '@vocdoni/react-providers'
import { OrganizationHeaderProps } from '../../types'
import { Image } from '../layout'

const BaseOrganizationHeader = (props: OrganizationHeaderProps) => {
  const styles = useStyleConfig('OrganizationHeader', props)
  const { organization } = useOrganization()

  if (!organization) return null
  const { header } = organization.account

  return <Image src={header} sx={styles} {...props} />
}
BaseOrganizationHeader.displayName = 'BaseOrganizationHeader'

export const OrganizationHeader = withRegistry(BaseOrganizationHeader, 'Organization', 'Header')
OrganizationHeader.displayName = 'OrganizationHeader'
