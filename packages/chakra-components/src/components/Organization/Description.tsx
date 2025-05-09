import { useStyleConfig } from '@chakra-ui/react'
import { useOrganization, withRegistry } from '@vocdoni/react-providers'
import { OrganizationDescriptionProps } from '../../types'
import { Markdown } from '../layout'

const BaseOrganizationDescription = (props: OrganizationDescriptionProps) => {
  const styles = useStyleConfig('OrganizationDescription', props)
  const { organization } = useOrganization()

  if (!organization) return null
  if (!organization.account.description) return null

  return (
    <Markdown {...props} sx={styles}>
      {organization.account.description.default}
    </Markdown>
  )
}
BaseOrganizationDescription.displayName = 'BaseOrganizationDescription'

export const OrganizationDescription = withRegistry(BaseOrganizationDescription, 'Organization', 'Description')
OrganizationDescription.displayName = 'OrganizationDescription'
