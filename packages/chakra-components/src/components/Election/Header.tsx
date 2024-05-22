import { useStyleConfig } from '@chakra-ui/system'
import { useElection } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { Image, IPFSImageProps } from '../layout'

export const ElectionHeader = (props: IPFSImageProps) => {
  const styles = useStyleConfig('ElectionHeader', props)
  const { election } = useElection()

  if (!election || !(election instanceof PublishedElection)) {
    return null
  }

  return <Image src={election?.header} sx={styles} {...props} />
}
