import { useStyleConfig } from '@chakra-ui/system'

import { Image, IPFSImageProps } from '../layout'
import { useElection } from './Election'

export const ElectionHeader = (props: IPFSImageProps) => {
  const styles = useStyleConfig('ElectionHeader', props)
  const { election } = useElection()

  return <Image src={election?.header} sx={styles} {...props} />
}
