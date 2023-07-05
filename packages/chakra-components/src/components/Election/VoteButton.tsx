import { Button, ButtonProps } from '@chakra-ui/button'
import { ElectionStatus, InvalidElection } from '@vocdoni/sdk'
import { useElection } from './Election'

export const VoteButton = (props: ButtonProps) => {
  const { signer, voting, ConnectButton, isAbleToVote, election, voted, localize } = useElection()
  const isDisabled = !signer || !isAbleToVote || election?.status !== ElectionStatus.ONGOING

  if (election instanceof InvalidElection) return null

  if (!signer && ConnectButton) {
    return <ConnectButton />
  }

  return (
    <Button type='submit' {...props} form='election-questions-form' isDisabled={isDisabled} isLoading={voting}>
      {voted && isAbleToVote ? localize('vote.button_update') : localize('vote.button')}
    </Button>
  )
}
