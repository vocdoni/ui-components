import { Button, ButtonProps, Text } from '@chakra-ui/react'
import { Signer } from '@ethersproject/abstract-signer'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus, InvalidElection } from '@vocdoni/sdk'
import { useState } from 'react'

export const VoteButton = (props: ButtonProps) => {
  const { connected } = useClient()
  const {
    client,
    connected: elConnected,
    loading: { voting },
    ConnectButton,
    isAbleToVote,
    election,
    voted,
    localize,
    sik: { signature },
    sikSignature,
  } = useElection()
  const [loading, setLoading] = useState<boolean>(false)

  if (!election || election instanceof InvalidElection) {
    return null
  }

  const isDisabled = !client.wallet || !isAbleToVote || election.status !== ElectionStatus.ONGOING

  if (!connected && !elConnected && ConnectButton) {
    return <ConnectButton />
  }

  const button: ButtonProps = {
    type: 'submit',
    ...props,
    form: `election-questions-${election.id}`,
    isDisabled,
    isLoading: voting,
    children: voted && isAbleToVote ? localize('vote.button_update') : localize('vote.button'),
  }

  if (connected && election.electionType.anonymous && !signature) {
    button.isLoading = loading
    button.type = 'button'
    button.isDisabled = !client.wallet || !isAbleToVote
    button.children = localize('vote.sign')
    button.onClick = async () => {
      setLoading(true)
      try {
        sikSignature(await client.anonymousService.signSIKPayload(client.wallet as Signer))
      } catch (e) {}
      setLoading(false)
    }
  }

  // when an election is ended and a user did not vote but already signed, show a message
  if ([ElectionStatus.ENDED, ElectionStatus.RESULTS].includes(election.status) && !voted && signature) {
    return <Text>{localize('errors.not_voted_in_ended_election')}</Text>
  }

  return <Button {...button} />
}
