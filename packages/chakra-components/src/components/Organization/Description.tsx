import { ChakraProps, useStyleConfig } from '@chakra-ui/react'
import { useOrganization } from '@vocdoni/react-providers'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'
import { Markdown } from '../layout'

export const OrganizationDescription = (props: Omit<ReactMarkdownProps, 'children' | 'node'> & ChakraProps) => {
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
OrganizationDescription.displayName = 'OrganizationDescription'
