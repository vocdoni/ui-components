import { Tag, TagProps } from '@chakra-ui/tag'
import { useEffect } from 'react'
import { useClient } from '../../client'

export const Balance = (props: TagProps) => {
  const { balance, account, fetchAccount } = useClient()

  useEffect(() => {
    if (typeof account !== 'undefined') return

    fetchAccount().then(console.log)
  }, [account])

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
