import { ButtonProps } from '@chakra-ui/button'
import { Text } from '@chakra-ui/layout'
import { Signer } from '@ethersproject/abstract-signer'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ArchivedElection, ElectionStatus, InvalidElection } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { Button } from '../layout/Button'
import { SpreadsheetAccess } from './SpreadsheetAccess'
import { chakra, useMultiStyleConfig } from '@chakra-ui/system'

export const VoteButton = (props: ButtonProps) => {
  const { connected } = useClient()
  const {
    client,
    loading: { voting },
    connected: lconnected,
    ConnectButton,
    isAbleToVote,
    election,
    voted,
    localize,
    sik: { signature },
    sikSignature,
  } = useElection()
  const [loading, setLoading] = useState<boolean>(false)

  if (!election) return null

  const isDisabled = !client.wallet || !isAbleToVote || election.status !== ElectionStatus.ONGOING

  if (election instanceof InvalidElection || election instanceof ArchivedElection) return null

  if (!connected && election.get('census.type') !== 'spreadsheet' && ConnectButton) {
    return <ConnectButton />
  }

  if (!lconnected && election.get('census.type') === 'spreadsheet') {
    return <SpreadsheetAccess />
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

export const VoteWeight = () => {
  const { client, election, localize } = useElection()
  const [weight, setWeight] = useState<string | null>(null)
  const styles = useMultiStyleConfig('VoteWeight')

  // Fetch the census proof for the current signer to extract the weight.
  // It uses the election provider to get the signer of the election (not the logged-in app user)
  useEffect(() => {
    ;(async () => {
      try {
        if (!client || !election || !client.wallet || !election.census.censusId) return
        const proof = await client.fetchProof(election.census.censusId, await client.wallet.getAddress())
        setWeight(proof.weight)
      } catch (e) {
        console.warn('Error fetching voter weight', e)
        setWeight(null)
      }
    })()
  }, [client, election])

  if (!weight) return null

  return (
    <chakra.div __css={styles.wrapper}>
      {localize('vote.weight')}
      <chakra.span __css={styles.weight}>{weight}</chakra.span>
    </chakra.div>
  )
}
