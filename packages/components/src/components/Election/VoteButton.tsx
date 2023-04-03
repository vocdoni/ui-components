import { Button, ButtonProps } from '@chakra-ui/button'
import { ElectionStatus } from '@vocdoni/sdk'
import { useElection } from './Election'

export const VoteButton = (props: ButtonProps) => {
  const { signer, loading, voting, ConnectButton, isAbleToVote, election, voted, trans } = useElection()
  const isDisabled = !signer || !isAbleToVote || election?.status !== ElectionStatus.ONGOING

  if (voted) return null

  if (!signer && ConnectButton) {
    return <ConnectButton />
  }

  return (
    <Button
      type='submit'
      {...props}
      form='election-questions-form'
      isDisabled={isDisabled}
      isLoading={loading || voting}
    >
      {trans('vote', 'Vote')}
    </Button>
  )
}
