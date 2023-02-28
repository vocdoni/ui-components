import { chakra } from '@chakra-ui/system'
import { Tag } from '@chakra-ui/tag'
import { useClientContext } from '../../client'

const _Balance = () => {
  const { balance } = useClientContext()

  if (balance < 0) {
    // maybe return the connectbutton here?
    return null
  }

  return <Tag size='sm' colorScheme='teal'>{balance} votokens</Tag>
}

export const Balance = chakra(_Balance)
Balance.displayName = 'Balance'
