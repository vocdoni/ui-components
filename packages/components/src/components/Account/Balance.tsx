import { Tag, TagProps } from '@chakra-ui/tag'
import { useClientContext } from '../../client'

export const Balance = (props: TagProps) => {
  const { balance } = useClientContext()

  if (balance < 0) {
    // maybe return the connectbutton here?
    return null
  }

  let color = 'teal'
  if (balance < 50 && balance > 20) {
    color = 'yellow'
  } else if (balance <= 20) {
    color = 'red'
  }

  return (
    <Tag size='sm' colorScheme={color} {...props}>
      {balance} votokens
    </Tag>
  )
}
