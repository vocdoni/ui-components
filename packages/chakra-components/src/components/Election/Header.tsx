import { useStyleConfig } from '@chakra-ui/system'
import { useElection } from '@vocdoni/react-providers'
import { Image, IPFSImageProps } from '../layout'

export const ElectionHeader = (props: IPFSImageProps) => {
  const styles = useStyleConfig('ElectionHeader', props)
  const { election } = useElection()

  return <Image src={election?.header} sx={styles} {...props} />
}
