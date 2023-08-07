import { ChakraProps, useStyleConfig } from '@chakra-ui/system'
import { useElection } from '@vocdoni/react-providers'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'
import { Markdown } from '../layout'

export const ElectionDescription = (props: Omit<ReactMarkdownProps, 'children' | 'node'> & ChakraProps) => {
  const styles = useStyleConfig('ElectionDescription', props)
  const { election } = useElection()

  if (!election || (election && !election.description)) return null

  return (
    <Markdown {...props} sx={styles}>
      {election.description.default}
    </Markdown>
  )
}
