import { ChakraProps, useStyleConfig } from '@chakra-ui/system'
import { Account } from '@vocdoni/sdk'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'
import { Markdown } from '../layout'
import { useOrganization } from './Organization'

export const OrganizationDescription = (props: Omit<ReactMarkdownProps, 'children' | 'node'> & ChakraProps) => {
  const styles = useStyleConfig('OrganizationDescription', props)
  const { organization } = useOrganization()

  if (!organization || (organization && !((organization as any).metadata as Account).description)) return null

  return (
    <Markdown {...props} sx={styles}>
      {((organization as any).metadata as Account).description.default}
    </Markdown>
  )
}
