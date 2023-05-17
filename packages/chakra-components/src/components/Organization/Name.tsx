import { HeadingProps } from '@chakra-ui/layout'
import { chakra, forwardRef, omitThemingProps, useStyleConfig } from '@chakra-ui/system'
import { useOrganization } from './Organization'

export const OrganizationName = forwardRef<HeadingProps, 'h1'>((props, ref) => {
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
OrganizationName.displayName = 'OrganizationName'
