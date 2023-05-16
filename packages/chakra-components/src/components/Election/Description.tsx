import { ChakraProps, useStyleConfig } from '@chakra-ui/system'

import { Markdown, MarkdownProps } from '../layout'
import { useElection } from './Election'

export const ElectionDescription = (props: Omit<MarkdownProps, 'children' | 'node'> & ChakraProps) => {
  const styles = useStyleConfig('ElectionDescription', props)
  const { election } = useElection()

  if (!election || (election && !election.description)) return null

  return (
    <Markdown {...props} sx={styles}>
      {election.description.default}
    </Markdown>
  )
}
