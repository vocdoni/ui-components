import { chakra, forwardRef, omitThemingProps, useStyleConfig } from '@chakra-ui/react'
import { useOrganization, withRegistry } from '@vocdoni/react-providers'
import { OrganizationNameProps } from '../../types'

const BaseOrganizationName = forwardRef<OrganizationNameProps, 'h1'>((props, ref) => {
  const { organization } = useOrganization()
  const styles = useStyleConfig('OrganizationName', props)
  const rest = omitThemingProps(props)

  if (!organization) return null

  return (
    <chakra.h1 ref={ref} {...rest} __css={styles}>
      {organization.account.name.default || organization.address}
    </chakra.h1>
  )
})
BaseOrganizationName.displayName = 'BaseOrganizationName'

export const OrganizationName = withRegistry(BaseOrganizationName, 'Organization', 'Name')
OrganizationName.displayName = 'OrganizationName'
