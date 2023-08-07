import { Tag, TagProps } from '@chakra-ui/tag'
import { useClient } from '@vocdoni/react-providers'

export const Balance = (props: TagProps) => {
  const { balance } = useClient()

  if (balance < 0) {
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
