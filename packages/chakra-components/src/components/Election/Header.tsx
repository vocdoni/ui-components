import { useStyleConfig } from '@chakra-ui/react'
import { useElection, withRegistry } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { ElectionHeaderProps } from '../../types'
import { Image } from '../layout'

const BaseElectionHeader = (props: ElectionHeaderProps) => {
  const styles = useStyleConfig('ElectionHeader', props)
  const { election } = useElection()

  if (!election || !(election instanceof PublishedElection)) {
    return null
  }

  return <Image src={election?.header} sx={styles} {...props} />
}
BaseElectionHeader.displayName = 'BaseElectionHeader'

export const ElectionHeader = withRegistry(BaseElectionHeader, 'Election', 'Header')
ElectionHeader.displayName = 'ElectionHeader'
