import { ButtonProps } from '@chakra-ui/button'
import { Text } from '@chakra-ui/layout'
import { chakra, useMultiStyleConfig } from '@chakra-ui/system'
import { Signer } from '@ethersproject/abstract-signer'
import { ElectionState, useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus, InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { Button } from '../layout/Button'
import { results } from './Results'
import { useQuestionsForm } from './Questions'

export const VoteButton = (props: ButtonProps) => {
  const election = useElection()
  try {
    const questionForm = useQuestionsForm()
    return <MultiElectionVoteButton {...props} />
  } catch (e) {
    return <VoteButtonLogic {...props} electionState={election} />
  }
}

export const MultiElectionVoteButton = (props: ButtonProps) => {
  const { isAbleToVote, voting, voted } = useQuestionsForm()
  const election = useElection() // use Root election information

  return (
    <VoteButtonLogic
      electionState={{ ...election, voted, loading: { ...election.loading, voting }, isAbleToVote }}
      {...props}
    />
  )
}

export const VoteButtonLogic = ({
  electionState,
  ...props
}: {
  electionState: ElectionState
} & ButtonProps) => {
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
  } = electionState
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
    form: `election-questions-${election.id}`,
    ...props,
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

export const VoteWeight = () => {
  const { client, election, localize } = useElection()
  const [weight, setWeight] = useState<number | null>(null)
  const styles = useMultiStyleConfig('VoteWeight')

  // Fetch the census proof for the current signer to extract the weight.
  // It uses the election provider to get the signer of the election (not the logged-in app user)
  useEffect(() => {
    ;(async () => {
      try {
        if (
          !client ||
          !election ||
          !client.wallet ||
          !(election instanceof PublishedElection) ||
          !election.census.censusId
        ) {
          return
        }

        const proof = await client.fetchProof(election.census.censusId, await client.wallet.getAddress())

        // If is token voting reduce decimals
        const decimals = (election.meta as any)?.token?.decimals || 0

        setWeight(results(Number(proof.weight), decimals))
      } catch (e) {
        console.warn('Error fetching voter weight', e)
        setWeight(null)
      }
    })()
  }, [client, election])

  if (!weight || !election || !(election instanceof PublishedElection)) return null

  return (
    <chakra.div __css={styles.wrapper}>
      {localize('vote.weight')}
      <chakra.span __css={styles.weight}>{weight}</chakra.span>
    </chakra.div>
  )
}
