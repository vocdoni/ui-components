import { Button } from '@chakra-ui/button'
import { ChakraProps } from '@chakra-ui/system'
import { ElectionStatus } from '@vocdoni/sdk'
import { useElection } from './Election'

export type VoteButtonProps = ChakraProps & {
  label?: string
}

export const VoteButton = ({ label, ...rest }: VoteButtonProps) => {
  const { signer, loading, voting, ConnectButton, isAbleToVote, election, voted } = useElection()
  const isDisabled = !signer || !isAbleToVote || election?.status !== ElectionStatus.ONGOING

  if (voted) return null

  if (!signer && ConnectButton) {
    return <ConnectButton />
  }

  return (
    <Button
      type='submit'
      {...rest}
      form='election-questions-form'
      isDisabled={isDisabled}
      isLoading={loading || voting}
    >
      {label || 'Vote'}
    </Button>
  )
}
