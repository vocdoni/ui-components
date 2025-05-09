import { useStyleConfig } from '@chakra-ui/react'
import { useElection, withRegistry } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { ElectionDescriptionProps } from '../../types'
import { Markdown } from '../layout'

const BaseElectionDescription = (props: ElectionDescriptionProps) => {
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
BaseElectionDescription.displayName = 'BaseElectionDescription'

export const ElectionDescription = withRegistry(BaseElectionDescription, 'Election', 'Description')
ElectionDescription.displayName = 'ElectionDescription'
