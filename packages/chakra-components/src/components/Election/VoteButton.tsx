import { Button, ButtonProps } from '@chakra-ui/button'
import { ElectionStatus, InvalidElection } from '@vocdoni/sdk'
import { useClient } from '../../client'
import { useElection } from './Election'

export const VoteButton = (props: ButtonProps) => {
  const { connected } = useClient()
  const {
    client,
    loading: { voting },
    ConnectButton,
    isAbleToVote,
    election,
    voted,
    localize,
  } = useElection()
  const isDisabled = !client.wallet || !isAbleToVote || election?.status !== ElectionStatus.ONGOING

  if (election instanceof InvalidElection) return null

  if (!connected && ConnectButton) {
    return <ConnectButton />
  }

  return (
    <Button
      type='submit'
      {...props}
      form={`election-questions-${election?.id}`}
      isDisabled={isDisabled}
      isLoading={voting}
    >
      {voted && isAbleToVote ? localize('vote.button_update') : localize('vote.button')}
    </Button>
  )
}
