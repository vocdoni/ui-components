import { ChakraProps, useStyleConfig } from '@chakra-ui/react'
import { useElection } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'
import { Markdown } from '../layout'

export const ElectionDescription = (props: Omit<ReactMarkdownProps, 'children' | 'node'> & ChakraProps) => {
  const styles = useStyleConfig('ElectionDescription', props)
  const { election } = useElection()

  if (!election || !(election instanceof PublishedElection) || !election.description) {
    return null
  }

  return (
    <Markdown {...props} sx={styles}>
      {election.description.default}
    </Markdown>
  )
}
