import { Tag } from '@chakra-ui/react'
import { useClient, withRegistry } from '@vocdoni/react-providers'
import { AccountBalanceProps } from '../../types'

const BaseBalance = (props: AccountBalanceProps) => {
  const { balance, localize } = useClient()

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
      {localize('balance', { balance })}
    </Tag>
  )
}
BaseBalance.displayName = 'BaseBalance'

export const Balance = withRegistry(BaseBalance, 'Account', 'Balance')
Balance.displayName = 'Balance'
